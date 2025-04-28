using Domain.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace WebAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SharedCartsController(CartService _cartService) : ControllerBase
{
    [HttpPost("cartId")]
    [Authorize]
    public async Task<IActionResult> AddUserToSharedCart([FromQuery]long cartId)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userId))
        {
            return Unauthorized();
        }

        //var result = await _cartService.AddUserToCartAsync()

        throw new Exception();
    }
}
