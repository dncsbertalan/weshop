namespace Domain.Models;

public class Address
{
    public long Id { get; set; }
    public short PostCode { get; set; }
    public string CityName { get; set; } = string.Empty;
    public string StreetName { get; set; } = string.Empty;
    public int Number {  get; set; }
}
