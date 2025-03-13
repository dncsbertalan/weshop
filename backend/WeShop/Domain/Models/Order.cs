namespace Domain.Models;

public class Order
{
    public Guid Id { get; set; }
    public long AddressId { get; set; }
    public int PaymentMethodId { get; set; }
    public bool IsCompleted { get; set; }
}
