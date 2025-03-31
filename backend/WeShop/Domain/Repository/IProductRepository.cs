using Domain.Dtos;
using Domain.Models;

namespace Domain.Repository;

public interface IProductRepository
{
    Task<PagedResult<ProductDto>?> GetProducts(int page, int pageSize, string? categoryIds, double minPrice, double maxPrice);
    Task<ProductDto?> GetById(long id);
}
