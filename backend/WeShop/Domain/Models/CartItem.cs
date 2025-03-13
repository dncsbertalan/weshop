using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Models;

[Table("CartItem")]
public class CartItem
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    public long Id { get; set; }

    [ForeignKey("CartId")]
    public Cart Cart { get; set; }

    [ForeignKey("ProductId")]
    public Product Product { get; set; }
    public int Quantity { get; set; }
}