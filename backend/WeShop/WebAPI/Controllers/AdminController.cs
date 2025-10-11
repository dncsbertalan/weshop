using Domain.Constants;
using Domain.Dtos.Api.Request;
using Domain.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Models;

namespace WebAPI.Controllers;

//[Authorize(Roles = RoleConstants.Admin)]
[ApiController]
[Route("api/[controller]/products")]
public class AdminController(ProductService _productService) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> CreateProduct([FromForm] CreateProductRequestDto createProductRequestDto)
    {
        var createProductDto = new CreateProductDto
        {
            Name = createProductRequestDto.Name,
            Description = createProductRequestDto.Description,
            Price = createProductRequestDto.Price,
            AvailableQuantity = createProductRequestDto.AvailableQuantity,
            CategoryIds = createProductRequestDto.CategoryIds,
        };
        
        if (createProductRequestDto.Image != null)
        {
            using var ms = new MemoryStream();
            await createProductRequestDto.Image.CopyToAsync(ms);
            createProductDto.Image = ms.ToArray();
            createProductDto.ImageMimeType = createProductRequestDto.Image.ContentType;
        }
        
        var createdProduct = await _productService.CreateProductAsync(createProductDto);

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
