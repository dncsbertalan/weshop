using Domain.Dtos;
using Domain.Models;
using Riok.Mapperly.Abstractions;

namespace DataAccess.Mappers;

[Mapper]
public static partial class ProductMapper
{
    public static partial ProductDto ToDto(Product_Data product);
}
