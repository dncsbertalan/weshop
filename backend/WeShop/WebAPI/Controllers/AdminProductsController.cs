using Domain.Dtos.Api.Request;
using Domain.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers;

[Authorize(Roles = "Admin")]
[ApiController]
[Route("api/admin/[controller]")]
public class AdminProductsController(ProductService _productService) : ControllerBase
{
    [HttpPost("products")]
    public async Task<IActionResult> CreateProduct([FromBody] CreateProductDto createProductDto)
    {
        var createdProduct = await _productService.CreateProductAsync(createProductDto);

        if (!createdProduct) return BadRequest("Could not create product.");

        return Ok();
    }

    [HttpPost("products/{productId}")]
    public async Task<IActionResult> DeleteProduct(long productId)
    {
        await _productService.DeleteProductAsync(productId);

        return Ok();
    } 
}
