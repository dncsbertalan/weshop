using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Models;

public class User_Data : IdentityUser
{
    [Required] public override string Email { get; set; } = string.Empty;

    [Required] public string FirstName { get; set; } = string.Empty;

    [Required] public string LastName { get; set; } = string.Empty;

    [Required] [DataType(DataType.Date)] public DateTime BirthDate { get; set; }

    [InverseProperty(nameof(Cart_Data.Owner))]
    public virtual Cart_Data OwnedCart { get; set; }

    [Required] public long ActiveCartId { get; set; }

    [DeleteBehavior(DeleteBehavior.Restrict)]
    [ForeignKey(nameof(ActiveCartId))]
    public virtual Cart_Data ActiveCart { get; set; }

    public List<SharedCart_Data> SharedCarts { get; set; } = [];

    [DataType(DataType.Date)] public DateTime RegisterDate { get; set; } = DateTime.Now;
}