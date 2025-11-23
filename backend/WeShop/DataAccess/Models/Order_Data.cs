using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataAccess.Models;

[Table("Order")]
public class Order_Data
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    public string UserId { get; set; }
    [ForeignKey("UserId")]
    public User_Data User { get; set; }

    public long AddressId { get; set; }
    [ForeignKey("AddressId")]
    public Address_Data Address { get; set; }

    [Required]
    public int PaymentMethodId { get; set; }
    [ForeignKey("PaymentMethodId")]
    public PaymentMethod_Data PaymentMethod { get; set; }

    [Required]
    [DataType(DataType.Date)]
    public DateTime CreatedAt { get; set; }
    public virtual List<OrderItem_Data> Items { get; set; } = [];
    public bool IsCompleted { get; set; }
}
