using Domain.Dtos;
using Domain.Models;
using Domain.Repository;
using System.Threading.Tasks;

namespace Domain.Services;

public class ProductService(IProductRepository _repository)
{
    public IEnumerable<ProductDto> GetAll()
    {
        return _repository.List();
    }

    public async Task<Product?> GetById(long id)
    {
        return await _repository.GetById(id);
    }
}