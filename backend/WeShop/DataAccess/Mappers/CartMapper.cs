using Domain.Dtos;
using Domain.Models;
using Riok.Mapperly.Abstractions;

namespace DataAccess.Mappers;

[Mapper]
public static partial class CartMapper
{
    public static partial CartDto ToDto(Cart_Data cart);

    public static CartDto Map(Cart_Data data) => new CartDto
    {
        CartItems = data.CartItems.Select(CartItemMapper.Map).ToList()
    };
}
