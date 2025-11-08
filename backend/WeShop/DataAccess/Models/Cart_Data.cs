using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataAccess.Models;

[Table("Cart")]
public class Cart_Data
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    public long Id { get; set; }

    // A cart must have one and only one owner
    [Required] public string OwnerId { get; set; }
    [ForeignKey(nameof(OwnerId))] public virtual User_Data Owner { get; set; }

    // Refers to the users whose active cart this is
    [InverseProperty(nameof(User_Data.ActiveCart))]
    public virtual List<User_Data> ActiveUsers { get; set; } = [];

    [Required] public bool IsShared { get; set; }

    public virtual List<CartItem_Data> CartItems { get; set; } = [];
    public virtual List<SharedCart_Data> Participants { get; set; } = [];
}