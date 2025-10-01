using Domain.Constants;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace DataAccess.Models;

public class User_Data : IdentityUser
{
    [Required]
    public string FirstName { get; set; } = string.Empty;

    [Required] 
    public string LastName { get; set; } = string.Empty;

    [Required]
    [DataType(DataType.Date)]
    public DateTime BirthDate { get; set; }

    [MaxLength(20)]
    public string Role { get; set; } = RoleConstants.User;

    public virtual Cart_Data Cart { get; set; }
    public List<SharedCart_Data> SharedCarts { get; set; } = [];
}