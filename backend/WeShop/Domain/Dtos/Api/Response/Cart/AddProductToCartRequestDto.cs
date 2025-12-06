using Domain.Dtos.Api.Response.User;

namespace Domain.Dtos.Api.Response.Cart;

public class AddProductToCartResponseDto
{
    public string ProductName { get; set; }
    public UserInformationDto AddedBy { get; set; }
    public CartInformationDto CartInfo { get; set; }
}