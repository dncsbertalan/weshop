namespace Domain.Dtos.Api;

public class ProductDto
{
    public long Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public double Price { get; set; }
    public int AvailableQuantity { get; set; }
    public List<CategoryDto> Categories { get; set; } = [];
}
