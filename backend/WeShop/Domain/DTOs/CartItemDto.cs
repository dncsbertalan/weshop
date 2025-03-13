namespace Domain.Dtos;

public class CartItemDto
{
    public long Id { get; set; }
    public int Quantity { get; set; }
    public ProductDto Product { get; set; }
}
