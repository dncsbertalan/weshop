using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Models;

[Table("Cart")]
public class Cart
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    public int Id { get; set; }

    [ForeignKey("UserId")]
    public User User { get; set; }

    //[ForeignKey("CartItemId")]
    //public List<CartItem> CarItems { get; set; } = [];
}
