namespace Domain.Models;

public class CreateOrderData
{
    public long CartId { get; set; }

    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string PhoneNumber { get; set; }

    public short PostCode { get; set; }
    public string CityName { get; set; }
    public string StreetName { get; set; }
    public int HouseNumber { get; set; }

    public int PaymentMethod { get; set; }
}
