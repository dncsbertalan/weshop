using System.Text.Json.Serialization;
using Domain.Dtos.Api.Response.Product;
using Domain.Dtos.Api.Response.User;

namespace WebAPI.Models;

public class CartChangedResponseDto
{
    public long CartId { get; set; }

    public UserInformationDto ChangedByUser { get; set; }

    public CartChangeType ChangeType { get; set; }

    public ProductDto Product { get; set; }
}

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum CartChangeType
{
    NewProductAdded,
    ProductRemoved,
    ProductUpdated
}