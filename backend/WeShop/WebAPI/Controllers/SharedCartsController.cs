using Domain.Models;
using Domain.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace WebAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SharedCartsController(CartService _cartService) : ControllerBase
{
    [HttpPost("{cartId}")]
    [Authorize]
    public async Task<IActionResult> AddUserToSharedCart(long cartId, [FromBody]AddUserToCartData data)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userId))
        {
            return Unauthorized();
        }

        var result = await _cartService.AddUserToCartAsync(userId, data, cartId);

        if (!result)
        {
            return BadRequest("An error occured adding the user to the cart.");
        }

        return Ok();
    }
}
