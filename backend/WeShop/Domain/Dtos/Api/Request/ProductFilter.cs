namespace Domain.Dtos.Api.Request;

public class ProductFilter
{
    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 30;
    public string? CategoryIds { get; set; }
    public double? MinPrice { get; set; }
    public double? MaxPrice { get; set; }
    public string? ProductName { get; set; }
}