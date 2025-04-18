using DataAccess.Mappers;
using DataAccess.Models;
using Domain.Dtos;
using Domain.Repository;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repository;

public class ProductRepository(WebshopDbContext _context) : IProductRepository
{
    public async Task<ProductDto?> GetByIdAsync(long id)
    {
        var result = await _context.Products.FindAsync(id);
        
        return result is null ? null : ProductMapper.ToDto(result);
    }

    public async Task<PagedResult<ProductDto>?> GetProductsAsync(int page, int pageSize, string? categoryIds, double minPrice, double maxPrice)
    {
        var query = _context.Products.Include(product => product.Categories).AsQueryable();

        query = query.Where(product => product.Price >= minPrice && product.Price <= maxPrice);

        // Filtering by categories
        if (!string.IsNullOrEmpty(categoryIds))
        {
            var categoryIdList = categoryIds.Split(',').Select(long.Parse).ToList();
            query = query.Where(product => product.Categories.Any(category => categoryIdList.Contains(category.Id)));
        }

        var totalItems = await query.CountAsync();
        if (totalItems == 0) return new PagedResult<ProductDto>([], 0, 0, 0);

        var totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);

        if (page > totalPages) return null;

        var products = await query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        var productDtos = products.Select(ProductMapper.ToDto).ToList();

        return new PagedResult<ProductDto>(productDtos, totalItems, totalPages, page);
    }
}
