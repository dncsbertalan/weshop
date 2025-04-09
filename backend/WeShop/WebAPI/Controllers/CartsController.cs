using Domain.Dtos;
using Domain.Models;
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

    [HttpPut("me/products/{cartItemId}")]
    [Authorize]
    public async Task<IActionResult> ModifyCartItem(long cartItemId, [FromBody] CartItemModificationData modificationData)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userId))
        {
            return Unauthorized();
        }

        var result = await _cartService.ModifyCartItem(userId, cartItemId, modificationData);

        if (!result) return BadRequest(new { message = "An error occured modifying the product in cart." });

        return Ok(new { message = "Product successfully modifyed in cart." });
    }

    [HttpPost("me/products")]
    [Authorize]
    public async Task<IActionResult> AddProductToCart([FromBody] AddProductToCartData productData)
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

    [HttpDelete("me/products/{cartItemId}")]
    [Authorize]
    public async Task<IActionResult> DeleteProductFromCart(long cartItemId)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userId))
        {
            return Unauthorized();
        }

        var result = await _cartService.RemoveItemFromCart(userId, cartItemId);

        if (!result)
        {
            return NotFound(new { message = "Cart or product not found in the cart." });
        }

        return Ok();
        //return NoContent();
    }
}
