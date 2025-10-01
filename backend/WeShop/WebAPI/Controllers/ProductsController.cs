using Domain.Dtos.Api;
using Domain.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace WebAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController(ProductService _productService) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<PagedResult<ProductDto>>> GetProducts(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 30,
        [FromQuery(Name = "filters")] string? categoryIds = null,
        [FromQuery(Name = "min")] double minPrice = 1000,
        [FromQuery(Name = "max")] double maxPrice = 100_000,
        [FromQuery] string? productName = null)
    {
        var result = await _productService.GetProductsAsync(page, pageSize, categoryIds, minPrice, maxPrice, productName);
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
