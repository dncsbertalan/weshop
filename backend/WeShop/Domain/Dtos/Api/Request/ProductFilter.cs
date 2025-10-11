namespace Domain.Dtos.Api.Request;

public class ProductFilter
{
    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 30;
    public List<long> CategoryIds { get; set; } = [];
    public double MinPrice { get; set; } = 0;
    public double MaxPrice { get; set; } = double.PositiveInfinity;
    public string? ProductName { get; set; } = null;
}