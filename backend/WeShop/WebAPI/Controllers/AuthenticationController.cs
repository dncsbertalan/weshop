using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.Json;
using DataAccess.Models;
using Domain.Constants;
using Domain.Dtos.Api.Response;
using Domain.Models;
using Domain.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace WebAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthenticationController(
    UserManager<User_Data> _userManager,
    IConfiguration _configuration,
    CartService _cartService) : ControllerBase
{
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegistrationData registrationData)
    {
        var user = new User_Data
        {
            UserName = registrationData.Email,
            Email = registrationData.Email,
            FirstName = registrationData.FirstName,
            LastName = registrationData.LastName,
            BirthDate = registrationData.BirthDate
        };

        var result = await _userManager.CreateAsync(user, registrationData.Password);

        if (!result.Succeeded) return BadRequest(result.Errors);

        var roleResult = await _userManager.AddToRoleAsync(user, RoleConstants.User);

        if (!roleResult.Succeeded) return BadRequest(roleResult.Errors);

        // TODO: New cart for the new user.
        await _cartService.CreateCartAsync(user.Id);

        return Ok(user.Id);
    }

    [HttpPost("login")]
    public async Task<ActionResult<string>> Login([FromBody] LoginRequestDto loginRequestDto)
    {
        var user = await _userManager.FindByEmailAsync(loginRequestDto.Email);
        if (user == null || !await _userManager.CheckPasswordAsync(user, loginRequestDto.Password))
            return Unauthorized();

        var token = await GenerateJwtToken(user);

        return Ok(new LoginResponseDto
        {
            Token = token
        });
    }

    [HttpGet("hello")]
    [Authorize]
    public ActionResult<string> HelloLoggedIn()
    {
        return Ok(new { message = "Hi" });
    }

    private async Task<string> GenerateJwtToken(User_Data user)
    {
        var claims = new List<Claim>
        {
            new(ClaimTypes.Email, user.Email),
            new(ClaimTypes.NameIdentifier, user.Id)
        };

        var roles = await _userManager.GetRolesAsync(user);

        claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

        var rolesJson = JsonSerializer.Serialize(roles);
        claims.Add(new Claim("roles", rolesJson));

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:SecretKey"]));

        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);

        var tokenDescriptor = new JwtSecurityToken(
            _configuration["JwtSettings:Issuer"],
            _configuration["JwtSettings:Audience"],
            claims,
            expires: DateTime.UtcNow.AddDays(1),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
    }
}