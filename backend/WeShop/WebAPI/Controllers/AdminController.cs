using System.Security.Claims;
using Domain.Constants;
using Domain.Dtos.Api.Request;
using Domain.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Models;

namespace WebAPI.Controllers;

[Authorize(Roles = RoleConstants.Admin)]
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
            CategoryIds = createProductRequestDto.CategoryIds
        };

        if (createProductRequestDto.Image != null)
        {
            using var ms = new MemoryStream();
            await createProductRequestDto.Image.CopyToAsync(ms);
            createProductDto.Image = ms.ToArray();
            createProductDto.ImageMimeType = createProductRequestDto.Image.ContentType;
        }

        var result = await _productService.CreateProductAsync(createProductDto);

        if (!result) return BadRequest("Could not create product.");

        return Ok();
    }

    [HttpPut("{productId:long}")]
    public async Task<IActionResult> UpdateProduct(long productId,
        [FromForm] UpdateProductRequestDto updateProductRequestDto)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(userId)) return Unauthorized();

        var updateProductDto = new UpdateProductDto
        {
            Name = updateProductRequestDto.Name,
            Description = updateProductRequestDto.Description,
            Price = updateProductRequestDto.Price,
            AvailableQuantity = updateProductRequestDto.AvailableQuantity,
            CategoryIds = updateProductRequestDto.CategoryIds
        };

        if (updateProductRequestDto.Image != null)
        {
            using var ms = new MemoryStream();
            await updateProductRequestDto.Image.CopyToAsync(ms);
            updateProductDto.Image = ms.ToArray();
            updateProductDto.ImageMimeType = updateProductRequestDto.Image.ContentType;
        }

        var result = await _productService.UpdateProductAsync(productId, userId, updateProductDto);

        if (!result) return BadRequest("Could not create product.");

        return Ok();
    }

    [HttpDelete("{productId:long}")]
    public async Task<IActionResult> DeleteProduct(long productId)
    {
        var result = await _productService.DeleteProductAsync(productId);

        if (!result) return BadRequest("Could not delete product.");

        return Ok();
    }
}