using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Models;

[Table("Order")]
public class Order_Data
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();

    [ForeignKey("AddressId")]
    public Address_Data Address { get; set; }

    [ForeignKey("PaymentMethodId")]
    public PaymentMethod_Data PaymentMethod { get; set; }
    public virtual List<OrderItem_Data> Items { get; set; } = [];
    public bool IsCompleted { get; set; }
}
