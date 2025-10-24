using Domain.Dtos.Api;
using Domain.Dtos.Api.Request;
using Domain.Dtos.Api.Response.Product;

namespace Domain.Repository;

public interface IProductRepository
{
    Task<bool> CreateProductAsync(CreateProductDto createProduct);
    
    Task<bool> DeleteProductAsync(long productId);
    
    Task<int?> GetAvailableQuantityAsync(long productId);
    
    Task<PagedResult<ProductDto>> GetProductsAsync(ProductFilter productFilter);
    
    Task<ProductImageResponse?> GetProductImageAsync(long productId);
    
    Task<ProductDto?> GetByIdAsync(long id);
    
    Task<bool> UpdateProductAsync(ProductDto product);
}
