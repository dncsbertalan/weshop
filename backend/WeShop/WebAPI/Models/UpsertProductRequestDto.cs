namespace WebAPI.Models;

public class UpsertProductRequestDto
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public double Price { get; set; }
    public int AvailableQuantity { get; set; }
    public IFormFile? Image { get; set; }
    public List<long> CategoryIds { get; set; } = [];
}