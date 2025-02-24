using Domain.Models;

namespace Domain.Repository;

public interface IProductRepository
{
    IReadOnlyCollection<Product> List();
    Product? GetById(long id);
}
