using Domain.Dtos.Api;
using Domain.Dtos.Api.Request;

namespace Domain.Repository;

public interface IProductRepository
{
    Task<bool> CreateProductAsync(CreateProductDto createProduct);
    
    Task<bool> DeleteProductAsync(long productId);
    
    Task<int?> GetAvailableQuantityAsync(long productId);
    
    Task<PagedResult<ProductDto>?> GetProductsAsync(ProductFilter productFilter);
    
    Task<ProductDto?> GetByIdAsync(long id);
    
    Task<bool> UpdateProductAsync(ProductDto product);
}
