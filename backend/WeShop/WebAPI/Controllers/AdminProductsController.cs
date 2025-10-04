using Domain.Dtos.Api.Request;
using Domain.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Models;

namespace WebAPI.Controllers;

[Authorize(Roles = "Admin")]
[ApiController]
[Route("api/admin/[controller]")]
public class AdminProductsController(ProductService _productService) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> CreateProduct([FromForm] UpsertProductRequestDto upsertProductRequestDto)
    {
        var upsertProductDto = new UpsertProductDto()
        {
            Name = upsertProductRequestDto.Name,
            Description = upsertProductRequestDto.Description,
            Price = upsertProductRequestDto.Price,
            AvailableQuantity = upsertProductRequestDto.AvailableQuantity,
            CategoryIds = upsertProductRequestDto.CategoryIds,
        };
        
        if (upsertProductRequestDto.Image != null)
        {
            using var ms = new MemoryStream();
            await upsertProductRequestDto.Image.CopyToAsync(ms);
            upsertProductDto.Image = ms.ToArray();
            upsertProductDto.ImageMimeType = upsertProductRequestDto.Image.ContentType;
        }
        
        var createdProduct = await _productService.CreateProductAsync(upsertProductDto);

        if (!createdProduct) return BadRequest("Could not create product.");

        return Ok();
    }

    [HttpPost("{productId:long}")]
    public async Task<IActionResult> DeleteProduct(long productId)
    {
        await _productService.DeleteProductAsync(productId);

        return Ok();
    } 
}
