using Domain.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataAccess.Models;

[Table("CartItem")]
public class CartItem_Data
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    public long Id { get; set; }

    public long CartId { get; set; }
    [ForeignKey("CartId")]
    public Cart_Data Cart { get; set; }

    public long ProductId { get; set; }
    [ForeignKey("ProductId")]
    public Product_Data Product { get; set; }
    public int Quantity { get; set; }

    public string? UserId { get; set; }
    [ForeignKey("UserId")]
    public User_Data? AddedBy { get; set; }
}