using Domain.Dtos.Api.Response.Category;
using Domain.Dtos.Api.Response.User;

namespace Domain.Dtos.Api.Response.Cart;

public class CartItemDto
{
    public long Id { get; set; }
    public int Quantity { get; set; }

    // Product properties
    public long ProductId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public double Price { get; set; }
    public int AvailableQuantity { get; set; }
    public List<CategoryDto> Categories { get; set; } = [];

    // Shared cart
    public UserInformationDto AddedBy { get; set; }
}