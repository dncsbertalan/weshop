using Domain.DTOs;
using Domain.Services;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : Controller
{
    private readonly UserService _userService;

    public UserController(UserService userService)
    {
        _userService = userService;
    }

    [HttpGet("{id}")]
    public ActionResult<UserDTO> GetUser(int id)
    {
        var user = _userService.GetById(id);
        return user != null ? Ok(user) : NotFound();
    }
}
