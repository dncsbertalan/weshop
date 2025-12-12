using System.Security.Claims;
using Domain.Dtos.Api.Response.User;
using Domain.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]/me")]
public class UsersController(UserService _userService) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<UserDto>> GetUser()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userId)) return Unauthorized();

        var user = await _userService.GetUserAsync(userId);

        if (user is null) return Unauthorized();

        return Ok(user);
    }

    [HttpPatch("active-cart/{cartId:long}")]
    public async Task<ActionResult> ChangeActiveCart(long cartId)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userId)) return Unauthorized();

        var success = await _userService.ChangeActiveCartAsync(userId, cartId);

        if (!success)
            return StatusCode(StatusCodes.Status500InternalServerError, "Unexpected error while updating active cart.");

        return Ok();
    }
}