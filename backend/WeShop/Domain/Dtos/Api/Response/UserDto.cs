namespace Domain.Dtos.Api.Response;

public class UserDto
{
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public DateTime BirthDate { get; set; }
    public long CartId { get; set; }
    public List<CartInformationDto> Carts { get; set; } = [];
}