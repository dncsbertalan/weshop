using Domain.Dtos;
using Domain.Models;

namespace Domain.Repository;

public interface IProductRepository
{
    IReadOnlyCollection<ProductDto> List();
    Task<ProductDto?> GetById(long id);
}
