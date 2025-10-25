namespace WebAPI.Models;

public class UpdateProductRequestDto
{
    public required string Name { get; set; }
    public string? Description { get; set; }
    public double Price { get; set; }
    public int AvailableQuantity { get; set; }
    public List<long> CategoryIds { get; set; }
    public IFormFile? Image { get; set; }
}