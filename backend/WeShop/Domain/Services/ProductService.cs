using Domain.Dtos.Api;
using Domain.Dtos.Api.Request;
using Domain.Models;
using Domain.Repository;
using System.Threading.Tasks;

namespace Domain.Services;

public class ProductService(IProductRepository _repository)
{
    public async Task<PagedResult<ProductDto>?> GetProductsAsync(int page, int pageSize, string? categoryIds, double minPrice, double maxPrice, string? productName)
    {
        if (page < 1 || pageSize < 1) return null;
        return await _repository.GetProductsAsync(page, pageSize, categoryIds, minPrice, maxPrice, productName);
    }

    public async Task<ProductDto?> GetByIdAsync(long id)
    {
        return await _repository.GetByIdAsync(id);
    }

    public async Task<bool> CreateProductAsync(CreateProductDto createProductDto)
    {
        if (string.IsNullOrWhiteSpace(createProductDto.Name) || createProductDto.Price < 0 || createProductDto.StockQuantity < 0)
        {
            return false;
        }

        return await _repository.CreateProductAsync(createProductDto);
    }

    public async Task<bool> DeleteProductAsync(long productId)
    {
        var product = await _repository.GetByIdAsync(productId);

        if (product is null) return false;

        await _repository.DeleteProductAsync(productId);

        return await Task.FromResult(true);
    }
}