using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Models;

[Table("Order")]
public class Order
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    public int Id { get; set; }

    [ForeignKey("AddressId")]
    public Address Address { get; set; }

    [ForeignKey("PaymentMethodId")]
    public PaymentMethod PaymentMethod { get; set; }

    //[ForeignKey("OrderItemId")]
    //public List<OrderItem> Items { get; set; } = [];
    public bool IsCompleted { get; set; }
}
