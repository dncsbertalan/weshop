using DataAccess.Models;
using Domain.Dtos.Api.Response.Cart;
using Domain.Dtos.Data;

namespace DataAccess.Mappers;

public static class CartMapper
{
    public static CartDto MapToCartDto(Cart_Data data)
    {
        return new CartDto
        {
            Id = data.Id,
            Owner = UserMapper.MapToUserInformationDto(data.Owner),
            IsShared = data.IsShared,
            CartItems = [.. data.CartItems.Select(CartItemMapper.MapToCartItemDto)],
            PriceTotal = data.CartItems.Sum(cartItem => cartItem.Product.Price * cartItem.Quantity),
            Quantity = data.CartItems.Count,
            SharedWith =
                [.. data.SharedWith.Select(sharedCart => UserMapper.MapToUserInformationDto(sharedCart.CartUser))]
        };
    }

    public static CartWithParticipantsDto MapToCartWithParticipantsDto(Cart_Data data)
    {
        return new CartWithParticipantsDto
        {
            OwnerId = data.OwnerId,
            Participants = [.. data.SharedWith.Select(user => user.CartUserId)]
        };
    }

    public static CartInformationDto MapToCartInfoDto(SharedCart_Data data)
    {
        return new CartInformationDto
        {
            CartId = data.CartId,
            Owner = UserMapper.MapToUserInformationDto(data.Cart.Owner)
        };
    }
}