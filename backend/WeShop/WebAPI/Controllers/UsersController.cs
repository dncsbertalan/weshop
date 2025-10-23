using Domain.Dtos.Api;
using Domain.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Domain.Dtos.Api.Response;

namespace WebAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController(UserService _userService) : ControllerBase
{
    [HttpGet("me")]
    [Authorize]
    public async Task<ActionResult<UserDto>> GetUser()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userId))
        {
            return Unauthorized();
        }

        var user = await _userService.GetUserAsync(userId);

        if (user is null)
        {
            return Unauthorized();
        }

        return Ok(user);
    }
}
