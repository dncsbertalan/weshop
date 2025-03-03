using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Domain.Models;

namespace Domain.DTOs;

public class UserDTO
{
    public int Id { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public DateTime BirthDate { get; set; }
    public Cart Cart { get; set; } = new Cart();
    public List<CartItem> CartItems { get; set; } = [];
}
