using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Models;

[Table("Cart")]
public class Cart
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    public long Id { get; set; }

    [ForeignKey("UserId")]
    public User User { get; set; }

    public virtual List<CartItem> CartItems { get; set; } = [];
}
