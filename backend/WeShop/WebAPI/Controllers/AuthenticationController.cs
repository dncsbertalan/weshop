using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Transactions;
using DataAccess.Models;
using Domain.Constants;
using Domain.Dtos.Api.Request;
using Domain.Dtos.Api.Response;
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
    public async Task<IActionResult> Register([FromBody] RegistrationRequestDto registrationRequestDto)
    {
        using var scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled);

        var user = new User_Data
        {
            UserName = registrationRequestDto.Email,
            Email = registrationRequestDto.Email,
            FirstName = registrationRequestDto.FirstName,
            LastName = registrationRequestDto.LastName
        };

        var result = await _userManager.CreateAsync(user, registrationRequestDto.Password);

        if (!result.Succeeded)
            return StatusCode(StatusCodes.Status500InternalServerError, new
            {
                result.Errors
            });

        var roleResult = await _userManager.AddToRoleAsync(user, RoleConstants.User);

        if (!roleResult.Succeeded)
            return StatusCode(StatusCodes.Status500InternalServerError, new
            {
                roleResult.Errors
            });


        var newCart = await _cartService.CreateCartAsync(user.Id);
        if (newCart is null)
            return StatusCode(StatusCodes.Status500InternalServerError);

        scope.Complete();
        return Ok();
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