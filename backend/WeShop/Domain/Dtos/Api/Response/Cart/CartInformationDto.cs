using Domain.Dtos.Api.Response.User;

namespace Domain.Dtos.Api.Response.Cart;

public class CartInformationDto
{
    public required long CartId { get; set; }

    public UserInformationDto Owner { get; set; }
}