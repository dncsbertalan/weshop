using Domain.DTOs;
using Domain.Models;
using Domain.Repository;

namespace Domain.Services;

public class ProductService
{
    private readonly IProductRepository _repository;

    public ProductService(IProductRepository repository)
    {
        _repository = repository;
    }

    public IEnumerable<ProductDTO> GetAll()
    {
        return _repository.List();
    }

    public ProductDTO? GetById(int id)
    {
        return _repository.GetById(id);
    }
}