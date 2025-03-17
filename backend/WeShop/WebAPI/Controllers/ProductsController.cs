using Domain.Dtos;
using Domain.Models;
using Domain.Repository;
using Domain.Services;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly ProductService _productService;

    public ProductsController(ProductService productRepository)
    {
        _productService = productRepository;
    }

    [HttpGet]
    public IEnumerable<ProductDto> GetAll()
    {
        return _productService.GetAll();
    }

    [HttpGet("{id}")]
    public ActionResult<ProductDto> Get(long id)
    {
        var product = _productService.GetById(id);
        return product != null ? Ok(product): NotFound();
    }
}
