namespace Domain.Dtos.Api;

public class CartInfoDto
{
    public long CartId { get; set; }
    public required string OwnerFirstName { get; set; }
    public required string OwnerLastName { get; set; }
}
