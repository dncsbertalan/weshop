using Domain.Dtos;
using Domain.Models;

namespace Domain.Repository;

public interface IProductRepository
{
    Task<PagedResult<ProductDto>?> GetProducts(int page, int pageSize, string? categoryIds);
    Task<ProductDto?> GetById(long id);
}
