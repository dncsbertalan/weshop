namespace Domain.Dtos.Api.Response;

public class ProductInformationDto
{
    public long Id { get; set; }
    public string Name { get; set; }
    public double Price { get; set; }
    public double AvailableQuantity { get; set; }
    
}