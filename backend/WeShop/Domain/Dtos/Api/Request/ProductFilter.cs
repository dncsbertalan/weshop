namespace Domain.Dtos.Api.Request;

public class ProductFilter
{
    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 30;
    public List<long> Filters { get; set; } = []; // CategoryIds
    public double Min { get; set; } = 0; // MinpPrice
    public double Max { get; set; } = 999999999; // MaxPrice
    public string? ProductName { get; set; } = null;
}