using Domain.Models;
using Riok.Mapperly.Abstractions;

namespace DataAccess.Mappers;

[Mapper]
public static partial class CartItemMapper
{
    public static partial CartItem ToDto(CartItem_Data cartItem);
}
