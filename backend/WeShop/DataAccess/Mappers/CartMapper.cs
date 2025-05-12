using DataAccess.Models;
using Domain.Dtos.Api;
using Domain.Dtos.Data;
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

    public static CartWithParticipantsDto MapToCartWithParticipantsDto(Cart_Data data) => new CartWithParticipantsDto
    {
        UserId = data.UserId,
        Participants = [.. data.Participants.Select(user => user.CartUserId)],
    };

    public static CartInfoDto MapToCartInfoDto(SharedCart_Data data) => new()
    {
        CartId = data.CartId,
        OwnerFirstName = data.Cart.User.FirstName,
        OwnerLastName = data.Cart.User.LastName,
    };
}
