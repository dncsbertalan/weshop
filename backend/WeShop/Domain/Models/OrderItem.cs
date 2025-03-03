using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Models;

[Table("OrderItem")]
public class OrderItem
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    public int Id { get; set; }

    [ForeignKey("OrderId")]
    public Order Order { get; set; }

    [Required]
    public string ProductName { get; set; } = string.Empty;

    [Required]
    public double Price { get; set; }

    [Required]
    public int Quantity { get; set; }
}
