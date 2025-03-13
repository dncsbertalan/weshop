namespace Domain.Models;

public class CartItem
{
    public long Id { get; set; }
    public long CartId { get; set; }
    public Guid ProductId { get; set; }
    public int Quantity { get; set; }
}