using Domain.Dtos;
using Domain.Models;
using Domain.Repository;
using Domain.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace WebAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController(ProductService _productRepository) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<PagedResult<ProductDto>>> GetProducts(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 30,
        [FromQuery(Name = "filters")] string? categoryIds = null,
        [FromQuery(Name = "min")] double minPrice = 1000,
        [FromQuery(Name = "max")] double maxPrice = 100_000)
    {
        var result = await _productRepository.GetProducts(page, pageSize, categoryIds, minPrice, maxPrice);
        if (result is null)
        {
            return BadRequest(new { message = "Something went wrong" });
        }

        return Ok(result);
    }

    [HttpGet("{id}")]
    public ActionResult<ProductDto> Get(long id)
    {
        var product = _productRepository.GetById(id);
        return product != null ? Ok(product): NotFound();
    }
}
