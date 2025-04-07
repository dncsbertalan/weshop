using Domain.Models;
using Domain.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace WebAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrdersController(OrderService _orderService) : ControllerBase
{
    [HttpPost("me/create")]
    [Authorize]
    public async Task<IActionResult> CreateOrderFromCart([FromBody] CreateOrderData orderData)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userId))
        {
            return Unauthorized();
        }

        var success = await _orderService.CreateOrder(userId, orderData);

        if (!success)
        {
            return BadRequest("Failed to create order.");
        }

        return Ok(new { message = "Successfully created order." });
        //return CreatedAtAction(nameof(GetOrderById), new { id = success.Id }, success);
    }
}