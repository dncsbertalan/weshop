using Domain.Models;
using Riok.Mapperly.Abstractions;

namespace DataAccess.Mappers;

[Mapper]
public static partial class CartMapper
{
    public static partial Cart ToDto(Cart_Data cart);
}
