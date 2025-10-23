namespace Domain.Dtos.Api.Response.Product;

public class ProductImageResponse
{
    public required byte[] Image { get; set; }
    public required string ImageMimeType { get; set; }
}