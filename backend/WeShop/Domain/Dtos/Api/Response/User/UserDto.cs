using Domain.Dtos.Api.Response.Cart;

namespace Domain.Dtos.Api.Response.User;

public class UserDto
{
    public required string UserId { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public required string Email { get; set; }
    public required DateTime BirthDate { get; set; }
    public required long ActiceCartId { get; set; }
    public List<CartInformationDto> Carts { get; set; } = [];
}