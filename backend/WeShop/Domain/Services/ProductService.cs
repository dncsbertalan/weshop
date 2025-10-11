using Domain.Dtos.Api;
using Domain.Dtos.Api.Request;
using Domain.Repository;

namespace Domain.Services;

public class ProductService(IProductRepository _productRepository)
{
    public async Task<PagedResult<ProductDto>?> GetProductsAsync(int page, int pageSize, string? categoryIds, double minPrice, double maxPrice, string? productName)
    {
        if (page < 1 || pageSize < 1) return null;
        
        return await _productRepository.GetProductsAsync(page, pageSize, categoryIds, minPrice, maxPrice, productName);
    }

    public async Task<ProductDto?> GetByIdAsync(long id)
    {
        return await _productRepository.GetByIdAsync(id);
    }

    public async Task<bool> CreateProductAsync(CreateProductDto createProductDto)
    {
        if (string.IsNullOrWhiteSpace(createProductDto.Name) || createProductDto.Price < 0 || createProductDto.AvailableQuantity < 0)
        {
            return false;
        }

        return await _productRepository.CreateProductAsync(createProductDto);
    }

    public async Task<bool> DeleteProductAsync(long productId)
    {
        var product = await _productRepository.GetByIdAsync(productId);

        if (product is null) return false;

        return await _productRepository.DeleteProductAsync(productId);
    }
}