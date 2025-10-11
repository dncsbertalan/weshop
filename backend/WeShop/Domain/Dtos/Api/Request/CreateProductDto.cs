namespace Domain.Dtos.Api.Request;

public class CreateProductDto
{
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public double Price { get; set; }
    public int AvailableQuantity { get; set; }
    public byte[]? Image { get; set; }
    public string? ImageMimeType { get; set; }
    public List<long> CategoryIds { get; set; } = [];
}
