using Domain.Dtos;
using Domain.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace WebAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CartsController(CartService _cartService) : ControllerBase
{
    [HttpPost]
    [Authorize]
    public async Task<IActionResult> CreateCart()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userId))
        {
            return Unauthorized();
        }

        var newCart = await _cartService.CreateCart(userId);

        return Ok(newCart);
    }

    [HttpGet("me")]
    [Authorize]
    public async Task<ActionResult<CartDto>> GetCart()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userId))
        {
            return Unauthorized();
        }

        var carts = await _cartService.GetCartById(userId);

        return Ok(carts);
    }

    [HttpPost("me/products")]
    [Authorize]
    //public async Task<IActionResult> AddProductToCart(long id, [FromBody] AddProductToCartDto productData)
    public async Task<IActionResult> AddProductToCart([FromBody] AddProductToCartDto productData)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userId))
        {
            return Unauthorized();
        }

        var result = await _cartService.AddProductToCart(userId, productData);

        if (!result) return BadRequest("An error occured adding product to cart.");

        return Ok("Product successfully added to cart.");
    }

    [HttpDelete("me/products/{productId}")]
    [Authorize]
    public async Task<IActionResult> DeleteProductFromCart(long productId)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userId))
        {
            return Unauthorized();
        }

        var result = await _cartService.RemoveItemFromCart(userId, productId);

        if (!result)
        {
            return NotFound(new { message = "Cart or product not found in the cart." });
        }

        return Ok();
        //return NoContent();
    }
}
