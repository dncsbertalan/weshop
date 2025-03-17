using Domain.Models;
using Riok.Mapperly.Abstractions;

namespace DataAccess.Mappers;

[Mapper]
public static partial class ProductMapper
{
    public static partial Product ToDto(Product_Data product);
}
