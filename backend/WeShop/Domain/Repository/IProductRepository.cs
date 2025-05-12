using Domain.Dtos.Api;

namespace Domain.Repository;

public interface IProductRepository
{
    Task<int?> GetAvailableQuantityAsync(long productId);
    Task<PagedResult<ProductDto>?> GetProductsAsync(int page, int pageSize, string? categoryIds, double minPrice, double maxPrice);
    Task<ProductDto?> GetByIdAsync(long id);
}
