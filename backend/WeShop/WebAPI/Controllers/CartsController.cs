using System.Security.Claims;
using Domain.Dtos.Api.Request;
using Domain.Dtos.Api.Response.Cart;
using Domain.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using WebAPI.Hubs;

namespace WebAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class CartsController(
    CartService _cartService,
    SharedCartService _sharedCartService,
    IHubContext<SharedCartHub> _cartHub) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> CreateCart()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userId)) return Unauthorized();

        var newCart = await _cartService.CreateCartAsync(userId);

        return Ok(newCart);
    }

    [HttpGet("{cartId}")]
    public async Task<ActionResult<CartDto>> GetCart(long cartId)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userId)) return Unauthorized();

        var carts = await _cartService.GetCartByIdAsync(userId, cartId);

        return Ok(carts);
    }

    [HttpPut("{cartId}/products/{cartItemId}")]
    public async Task<IActionResult> ModifyCartItem(long cartId, long cartItemId,
        [FromBody] CartItemModificationRequestDto modificationRequest)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userId)) return Unauthorized();

        var result = await _cartService.ModifyCartItemAsync(userId, cartId, cartItemId, modificationRequest);

        if (!result) return BadRequest(new { message = "An error occured modifying the product in cart." });

        await NotifyCartChange(cartId);

        return Ok(new { message = "Product successfully modifyed in cart." });
    }

    [HttpPost("{cartId}/products")]
    public async Task<IActionResult> AddProductToCart(long cartId, [FromBody] AddProductToCartRequestDto productRequest)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userId)) return Unauthorized();

        var result = await _cartService.AddProductToCartAsync(userId, cartId, productRequest);

        if (!result) return BadRequest("An error occured adding product to cart.");

        await NotifyCartChange(cartId);

        return Ok("Product successfully added to cart.");
    }

    [HttpDelete("{cartId:long}/products/{cartItemId:long}")]
    public async Task<IActionResult> DeleteProductFromCart(long cartId, long cartItemId)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userId)) return Unauthorized();

        var result = await _cartService.RemoveItemFromCartAsync(userId, cartId, cartItemId);

        if (!result) return NotFound(new { message = "Cart or product not found in the cart." });

        await NotifyCartChange(cartId);

        return Ok();
        //return NoContent();
    }

    [HttpPost("{cartId:long}/users")]
    public async Task<IActionResult> AddUserToSharedCart(long cartId, [FromBody] AddUserToCartRequestDto request)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userId)) return Unauthorized();

        var result = await _sharedCartService.AddUserToCartAsync(userId, request, cartId);

        if (!result) return BadRequest("An error occured adding the user to the cart.");

        return Ok();
    }

    [HttpDelete("{cartId:long}/users/{userToRemoveId}")]
    public async Task<IActionResult> RemoveUserFromSharedCart(long cartId, string userToRemoveId)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userId)) return Unauthorized();

        var result = await _sharedCartService.RemoveUserFromCartAsync(userId, userToRemoveId, cartId);

        if (!result) return BadRequest("An error occured removing the user from the cart.");

        return Ok();
    }


    #region Helper methods

    private async Task NotifyCartChange(long cartId)
    {
        await _cartHub
            .Clients
            .Group(cartId.ToString())
            .SendAsync("ProductAdded", new
            {
                cartId
            });
    }

    #endregion
}