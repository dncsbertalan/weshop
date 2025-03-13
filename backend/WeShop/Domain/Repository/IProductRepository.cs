using Domain.Dtos;

namespace Domain.Repository;

public interface IProductRepository
{
    IReadOnlyCollection<ProductDto> List();
    ProductDto? GetById(string id);
}
