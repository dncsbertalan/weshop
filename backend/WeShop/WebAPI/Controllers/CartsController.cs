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

        var newCart = await _cartService.CreateCartAsync(userId);

        return Ok(newCart);
    }

    [HttpGet("{cartId}")]
    [Authorize]
    public async Task<ActionResult<CartDto>> GetCart(long cartId)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userId))
        {
            return Unauthorized();
        }

        var carts = await _cartService.GetCartByIdAsync(userId, cartId);

        return Ok(carts);
    }

    [HttpPut("{cartId}/products/{cartItemId}")]
    [Authorize]
    public async Task<IActionResult> ModifyCartItem(long cartId, long cartItemId, [FromBody] CartItemModificationData modificationData)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userId))
        {
            return Unauthorized();
        }

        var result = await _cartService.ModifyCartItemAsync(userId, cartId, cartItemId, modificationData);

        if (!result) return BadRequest(new { message = "An error occured modifying the product in cart." });

        return Ok(new { message = "Product successfully modifyed in cart." });
    }

    [HttpPost("{cartId}/products")]
    [Authorize]
    public async Task<IActionResult> AddProductToCart(long cartId, [FromBody] AddProductToCartData productData)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userId))
        {
            return Unauthorized();
        }

        var result = await _cartService.AddProductToCartAsync(userId, cartId, productData);

        if (!result) return BadRequest("An error occured adding product to cart.");

        return Ok("Product successfully added to cart.");
    }

    [HttpDelete("{cartId}/products/{cartItemId}")]
    [Authorize]
    public async Task<IActionResult> DeleteProductFromCart(long cartId, long cartItemId)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userId))
        {
            return Unauthorized();
        }

        var result = await _cartService.RemoveItemFromCartAsync(userId, cartId, cartItemId);

        if (!result)
        {
            return NotFound(new { message = "Cart or product not found in the cart." });
        }

        return Ok();
        //return NoContent();
    }
}
