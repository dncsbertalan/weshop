using Domain.Dtos;
using Domain.Models;
using Domain.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace WebAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthenticationController : ControllerBase
{
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;
    private readonly IConfiguration _configuration;

    public AuthenticationController(UserManager<User> userManager, SignInManager<User> signInManager, IConfiguration configuration)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _configuration = configuration;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegistrationDto registrationData)
    {
        var user = new User
        {
            UserName = registrationData.Email,
            Email = registrationData.Email,
            FirstName = registrationData.FirstName,
            LastName = registrationData.LastName,
            BirthDate = registrationData.BirthDate
        };

        var result = await _userManager.CreateAsync(user, registrationData.Password);

        if (!result.Succeeded) return BadRequest(result.Errors);

        return Ok(user.Id);
    }

    [HttpPost("login")]
    public async Task<ActionResult<string>> Login([FromBody] LoginDto loginData)
    {
        var user = await _userManager.FindByEmailAsync(loginData.Email);
        if (user == null || !await _userManager.CheckPasswordAsync(user, loginData.Password))
        {
            return Unauthorized();
        }

        var token = GenerateJwtToken(user);
        return Ok(token);
    }

    [HttpGet("hello")]
    [Authorize]
    public ActionResult<string> HelloLoggedIn()
    {
        return Ok(new { message = "Hi" });
    }

    private string GenerateJwtToken(User user)
    {
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.NameIdentifier, user.Id)
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:SecretKey"]));

        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);

        var tokenDescriptor = new JwtSecurityToken(
            issuer: _configuration["JwtSettings:Issuer"],
            audience: _configuration["JwtSettings:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddDays(1),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
    }
}
