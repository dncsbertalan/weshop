using DataAccess.Models;
using Domain.Dtos.Api;
using Domain.Dtos.Api.Response.Product;
using Riok.Mapperly.Abstractions;

namespace DataAccess.Mappers;

[Mapper]
public static partial class ProductMapper
{
    public static partial ProductDto ToDto(Product_Data product);
}
