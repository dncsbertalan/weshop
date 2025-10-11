using Domain.Dtos.Api;
using Domain.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Domain.Dtos.Api.Request;

namespace WebAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController(ProductService _productService) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<PagedResult<ProductDto>>> GetProducts([FromQuery] ProductFilter productFilter)
    {
        var result = await _productService.GetProductsAsync(productFilter);
        if (result is null)
        {
            return BadRequest(new { message = "Something went wrong" });
        }

        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ProductDto>> Get(long id)
    {
        var product = await _productService.GetByIdAsync(id);
        return product is not null ? Ok(product): NotFound();
    }
}
