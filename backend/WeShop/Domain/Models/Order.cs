using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Models;

[Table("Order")]
public class Order
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();

    [ForeignKey("AddressId")]
    public Address Address { get; set; }

    [ForeignKey("PaymentMethodId")]
    public PaymentMethod PaymentMethod { get; set; }
    public virtual List<OrderItem> Items { get; set; } = [];
    public bool IsCompleted { get; set; }
}
