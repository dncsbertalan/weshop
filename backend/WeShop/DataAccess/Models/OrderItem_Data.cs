using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Models;

[Table("OrderItem")]
public class OrderItem_Data
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();

    [ForeignKey("OrderId")]
    public Order_Data Order { get; set; }

    [Required]
    public string ProductName { get; set; } = string.Empty;

    [Required]
    public double Price { get; set; }

    [Required]
    public int Quantity { get; set; }
}
