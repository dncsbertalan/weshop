using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Models;

[Table("CartItem")]
public class CartItem_Data
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    public long Id { get; set; }

    public long CartId { get; set; }

    [DeleteBehavior(DeleteBehavior.Restrict)]
    [ForeignKey(nameof(CartId))]
    public Cart_Data Cart { get; set; }

    public long ProductId { get; set; }

    [ForeignKey(nameof(ProductId))] public Product_Data Product { get; set; }

    public int Quantity { get; set; }

    [Required] public string UserId { get; set; }

    [ForeignKey(nameof(UserId))] public virtual User_Data AddedBy { get; set; }
}