using Domain.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataAccess.Models;

[Table("Cart")]
public class Cart_Data
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    public long Id { get; set; }

    public string UserId { get; set; }
    [ForeignKey("UserId")]
    public User_Data User { get; set; }

    public virtual List<CartItem_Data> CartItems { get; set; } = [];
}
