using DataAccess.Mappers;
using DataAccess.Models;
using Domain.Dtos.Api;
using Domain.Dtos.Api.Request;
using Domain.Dtos.Api.Response.Product;
using Domain.Models;
using Domain.Repository;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repository;

public class ProductRepository(WebshopDbContext _context) : IProductRepository
{
    public async Task<bool> CreateProductAsync(CreateProductDto createProduct)
    {
        var categories = await _context.Categories
            .Where(category => createProduct.CategoryIds.Contains(category.Id))
            .ToListAsync();
        
        var newProduct = new Product_Data
        {
            Name = createProduct.Name,
            Description = createProduct.Description,
            Price = createProduct.Price,
            AvailableQuantity = createProduct.AvailableQuantity,
            Image = createProduct.Image,
            ImageMimeType = createProduct.ImageMimeType,
            Categories = categories,
        };

        _context.Products.Add(newProduct);
        var result = await _context.SaveChangesAsync();

        return result > 0;
    }

    public async Task<bool> DeleteProductAsync(long productId)
    {
        var product = await _context.Products.FindAsync(productId);
        if (product == null)
        {
            return false;
        }

        product.IsDeleted = true;
        product.ModifiedAt = DateTime.UtcNow;
        
        var result = await _context.SaveChangesAsync();

        return result > 0;
    }

    public async Task<int?> GetAvailableQuantityAsync(long productId)
    {
        var result = await _context.Products.FindAsync(productId);

        return result?.AvailableQuantity;
    }

    public async Task<ProductImageResponse?> GetProductImageAsync(long productId)
    {
        var result = await _context.Products.FindAsync(productId);

        if (result?.Image == null || result.ImageMimeType == null)
        {
            return null;
        }
        
        return new ProductImageResponse
        {
            Image = result.Image, ImageMimeType = result.ImageMimeType
        };
    }

    public async Task<ProductDto?> GetByIdAsync(long id)
    {
        var result = await _context.Products.Include(product => product.Categories).Where(product => product.Id == id).FirstOrDefaultAsync();
        
        return result is null ? null : ProductMapper.ToDto(result);
    }

    public async Task<bool> UpdateProductAsync(ProductDto product)
    {
        throw new NotImplementedException();
    }

    public async Task<PagedResult<ProductDto>?> GetProductsAsync(ProductFilter productFilter)
    {
        var query = _context.Products.Include(product => product.Categories).AsQueryable();

        query = query.Where(product => product.Price >= productFilter.Min && product.Price <= productFilter.Max && product.AvailableQuantity > 0);

        if (!string.IsNullOrWhiteSpace(productFilter.ProductName))
        {
            var lowered = productFilter.ProductName.ToLower();
            query = query.Where(product => product.Name.ToLower().Contains(lowered));
        }

        // Filtering by categories
        if (!string.IsNullOrEmpty(productFilter.Filters))
        {
            var categoryIdList = productFilter.Filters.Split(',').Select(long.Parse).ToList();
            query = query.Where(product => product.Categories.Any(category => categoryIdList.Contains(category.Id)));
        }

        var totalItems = await query.CountAsync();
        if (totalItems == 0) return new PagedResult<ProductDto>([], 0, 0, 0);

        var totalPages = (int)Math.Ceiling(totalItems / (double)productFilter.PageSize);

        if (productFilter.Page > totalPages) return null;

        var products = await query
            .Skip((productFilter.Page - 1) * productFilter.PageSize)
            .Take(productFilter.PageSize)
            .ToListAsync();

        var productDtos = products.Select(ProductMapper.ToDto).ToList();

        return new PagedResult<ProductDto>(productDtos, totalItems, totalPages, productFilter.Page);
    }
}
