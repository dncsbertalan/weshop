using Domain.Dtos;
using Domain.Models;
using Domain.Repository;
using Domain.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Threading.Tasks;

namespace WebAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CartsController : ControllerBase
{
    private readonly CartService _cartService;

    public CartsController(CartService cartService)
    {
        _cartService = cartService;
    }

    [HttpGet("{id}")]
    [Authorize]
    public async Task<ActionResult<List<CartItemDto>>> GetCart(long id)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userId))
        {
            return Unauthorized();
        }

        var carts = await _cartService.GetCartById(userId, id);
        return Ok(carts);
    }

    [HttpPost("{id}")]
    [Authorize]
    public async Task<IActionResult> AddItemToCart(long id, [FromBody] CartItemModificationDto productData)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userId))
            return Unauthorized();

        var result = await _cartService.AddItemToCart(id, userId, productData);

        if (!result)
            return BadRequest("An error occured modifying cart data.");

        return Ok("Product successfully added to cart.");
    }
}
