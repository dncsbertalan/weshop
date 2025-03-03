using Domain.DTOs;

namespace Domain.Repository;

public interface IProductRepository
{
    IReadOnlyCollection<ProductDTO> List();
    ProductDTO? GetById(int id);
}
