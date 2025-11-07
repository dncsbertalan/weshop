using DataAccess.Models;
using Domain.Dtos.Api.Response;
using Domain.Dtos.Data;

namespace DataAccess.Mappers;

public static class UserMapper
{
    public static SimpleUserDto MapToSimpleUserDto(User_Data data) => new()
    {
        UserId = data.Id,
    };

    public static UserDto MapToUserDto(User_Data data) => new()
    {
        FirstName = data.FirstName,
        LastName = data.LastName,
        Email = data.Email,
        BirthDate = data.BirthDate,
        CartId = data.Cart.Id,
        Carts = [.. data.SharedCarts.Select(CartMapper.MapToCartInfoDto)],
    };
}
