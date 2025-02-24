namespace Domain.Models;

public class Cart
{
    public long Id { get; set; }
    public long UserId { get; set; }
    public List<CartItem> CarItems { get; set; }
}
