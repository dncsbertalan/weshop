using DataAccess.Models;
using Domain.Dtos.Api;
using Domain.Dtos.Api.Response.Cart;
using Domain.Dtos.Data;
using Riok.Mapperly.Abstractions;

namespace DataAccess.Mappers;

[Mapper]
public static partial class CartMapper
{
    public static CartDto Map(Cart_Data data)
    {
        return new CartDto
        {
            Id = data.Id,
            OwnerId = data.OwnerId,
            IsShared = data.IsShared,
            CartItems = [.. data.CartItems.Select(CartItemMapper.Map)]
        };
    }

    public static CartWithParticipantsDto MapToCartWithParticipantsDto(Cart_Data data)
    {
        return new CartWithParticipantsDto
        {
            UserId = data.OwnerId,
            Participants = [.. data.Participants.Select(user => user.CartUserId)]
        };
    }

    public static CartInformationDto MapToCartInfoDto(SharedCart_Data data)
    {
        return new CartInformationDto
        {
            CartId = data.CartId,
            OwnerEmail = data.Cart.Owner.Email,
            OwnerFirstName = data.Cart.Owner.FirstName,
            OwnerLastName = data.Cart.Owner.LastName
        };
    }
}