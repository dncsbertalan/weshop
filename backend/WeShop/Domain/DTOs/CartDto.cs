namespace Domain.Dtos;

public class CartDto
{
    public long Id { get; set; }
    public List<CartItemDto> CartItems { get; set; } = [];
}
