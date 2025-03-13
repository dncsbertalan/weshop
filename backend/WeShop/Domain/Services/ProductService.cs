using Domain.Dtos;
using Domain.Repository;

namespace Domain.Services;

public class ProductService
{
    private readonly IProductRepository _repository;

    public ProductService(IProductRepository repository)
    {
        _repository = repository;
    }

    public IEnumerable<ProductDto> GetAll()
    {
        return _repository.List();
    }

    public ProductDto? GetById(string id)
    {
        return _repository.GetById(id);
    }
}