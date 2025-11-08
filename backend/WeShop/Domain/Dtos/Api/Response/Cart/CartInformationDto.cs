namespace Domain.Dtos.Api.Response.Cart;

public class CartInformationDto
{
    public long CartId { get; set; }
    public required string OwnerEmail { get; set; }
    public required string OwnerFirstName { get; set; }
    public required string OwnerLastName { get; set; }
}
