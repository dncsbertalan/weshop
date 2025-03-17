using Domain.Models;

namespace Domain.Dtos;

public class CartItemDto
{
    public long Id { get; set; }
    public int Quantity { get; set; }

    // Product properties
    public long ProductId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public double Price { get; set; }
    public int AvailableQuantity { get; set; }
    public List<CategoryDto> Categories { get; set; } = [];
}
