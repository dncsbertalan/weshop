namespace Domain.Models;

public class OrderItem
{
    public Guid Id { get; set; }
    public Guid OrderId { get; set; }
    public string ProductName { get; set; } = string.Empty;
    public double Price { get; set; }
    public int Quantity { get; set; }
}
