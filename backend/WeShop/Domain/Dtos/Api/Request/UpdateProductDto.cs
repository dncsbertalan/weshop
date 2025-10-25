namespace Domain.Dtos.Api.Request;

public class UpdateProductDto
{
    public required string Name { get; set; }
    public string? Description { get; set; }
    public double Price { get; set; }
    public int AvailableQuantity { get; set; }
    public List<long> CategoryIds { get; set; } = [];
    public byte[]? Image { get; set; }
    public string? ImageMimeType { get; set; }
}