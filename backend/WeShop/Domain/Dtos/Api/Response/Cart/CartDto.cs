using Domain.Dtos.Api.Response.User;

namespace Domain.Dtos.Api.Response.Cart;

public class CartDto
{
    public long Id { get; set; }
    public UserInformationDto Owner { get; set; }
    public bool IsShared { get; set; }
    public List<CartItemDto> CartItems { get; set; } = [];
    public double PriceTotal { get; set; }
    public int Quantity { get; set; }
    public List<UserInformationDto> SharedWith { get; set; }
}