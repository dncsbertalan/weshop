using Domain.Models;
using Domain.Repository;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IProductRepository productRepository;

    public ProductsController(IProductRepository productRepository)
    {
        this.productRepository = productRepository;
    }

    [HttpGet]
    public IEnumerable<Product> GetAll()
    {
        return productRepository.List();
    }

    [HttpGet("{id}")]
    public ActionResult<Product> Get(int id)
    {
        var product = productRepository.GetById(id);
        return product != null ? Ok(product): NotFound();
    }
}
