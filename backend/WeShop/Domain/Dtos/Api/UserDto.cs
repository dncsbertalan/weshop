namespace Domain.Dtos.Api;

public class UserDto
{
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public DateTime BirthDate { get; set; }
    public long CartId { get; set; }
    public List<CartInfoDto> Carts { get; set; } = [];
}
