using Domain.Dtos;
using Domain.Models;
using Riok.Mapperly.Abstractions;

namespace DataAccess.Mappers;

[Mapper]
public partial class CartItemMapper
{
    public partial CartItemDto ToDto(CartItem cartItem);
}
