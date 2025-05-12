namespace Domain.Dtos.Api;

public class CartDto
{
    public long Id { get; set; }
    public bool IsShared { get; set; }
    public List<CartItemDto> CartItems { get; set; } = [];
}
