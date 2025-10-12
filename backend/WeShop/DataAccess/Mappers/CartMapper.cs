using DataAccess.Models;
using Domain.Dtos.Api;
using Domain.Dtos.Api.Response;
using Domain.Dtos.Data;
using Riok.Mapperly.Abstractions;

namespace DataAccess.Mappers;

[Mapper]
public static partial class CartMapper
{
    public static CartDto Map(Cart_Data data) => new()
    {
        Id = data.Id,
        OwnerId = data.UserId,
        IsShared = data.IsShared,
        CartItems = [.. data.CartItems.Select(CartItemMapper.Map)]
    };

    public static CartWithParticipantsDto MapToCartWithParticipantsDto(Cart_Data data) => new()
    {
        UserId = data.UserId,
        Participants = [.. data.Participants.Select(user => user.CartUserId)],
    };

    public static CartInformationDto MapToCartInfoDto(SharedCart_Data data) => new()
    {
        CartId = data.CartId,
        OwnerEmail = data.Cart.User.Email,
        OwnerFirstName = data.Cart.User.FirstName,
        OwnerLastName = data.Cart.User.LastName,
    };
}
