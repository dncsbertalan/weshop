using Domain.Dtos;
using Domain.Models;
using Domain.Repository;
using System.Threading.Tasks;

namespace Domain.Services;

public class ProductService(IProductRepository _repository)
{
    public async Task<PagedResult<ProductDto>?> GetProductsAsync(int page, int pageSize, string? categoryIds, double minPrice, double maxPrice)
    {
        if (page < 1 || pageSize < 1) return null;
        return await _repository.GetProductsAsync(page, pageSize, categoryIds, minPrice, maxPrice);
    }

    public async Task<ProductDto?> GetByIdAsync(long id)
    {
        return await _repository.GetByIdAsync(id);
    }
}