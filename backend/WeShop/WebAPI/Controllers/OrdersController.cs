using Domain.Dtos.Api;
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

        var success = await _orderService.CreateOrderAsync(userId, orderData);

        if (!success)
        {
            return BadRequest("Failed to create order.");
        }

        return Ok(new { message = "Successfully created order." });
        //return CreatedAtAction(nameof(GetOrderById), new { id = success.Id }, success);
    }

    [HttpGet("me")]
    [Authorize]
    public async Task<ActionResult<OrdersDto>> GetOrders()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userId))
        {
            return Unauthorized();
        }

        var orders = await _orderService.GetOrdersAsync(userId);

        if (orders is null)
        {
            return BadRequest(new { message = "Something went wrong" });
        }

        return Ok(orders);
    }
}