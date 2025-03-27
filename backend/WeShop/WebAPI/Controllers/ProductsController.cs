using Domain.Dtos;
using Domain.Models;
using Domain.Repository;
using Domain.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

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
    public async Task<ActionResult<PagedResult<ProductDto>>> GetProducts([FromQuery] int page = 1, [FromQuery] int pageSize = 30, [FromQuery] string? categoryIds = null)
    {
        var result = await _productService.GetProducts(page, pageSize, categoryIds);
        if (result is null)
        {
            return BadRequest(new { message = "Something went wrong" });
        }

        return Ok(result);
    }

    [HttpGet("{id}")]
    public ActionResult<ProductDto> Get(long id)
    {
        var product = _productService.GetById(id);
        return product != null ? Ok(product): NotFound();
    }
}
