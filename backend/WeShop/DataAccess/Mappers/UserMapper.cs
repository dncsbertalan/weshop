using DataAccess.Models;
using Domain.Dtos.Api.Response;
using Domain.Dtos.Data;

namespace DataAccess.Mappers;

public static class UserMapper
{
    public static SimpleUserDto MapToSimpleUserDto(User_Data data)
    {
        return new SimpleUserDto
        {
            UserId = data.Id
        };
    }

    public static UserDto MapToUserDto(User_Data data)
    {
        return new UserDto
        {
            FirstName = data.FirstName,
            LastName = data.LastName,
            Email = data.Email,
            BirthDate = data.BirthDate,
            ActiceCartId = data.ActiveCartId,
            Carts = [.. data.SharedCarts.Select(CartMapper.MapToCartInfoDto)]
        };
    }
}