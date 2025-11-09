using DataAccess.Models;
using Domain.Dtos.Api.Response.User;
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
            UserId = data.Id,
            FirstName = data.FirstName,
            LastName = data.LastName,
            Email = data.Email,
            BirthDate = data.BirthDate,
            ActiceCartId = (long)data.ActiveCartId!,
            Carts = [.. data.SharedCarts.Select(CartMapper.MapToCartInfoDto)]
        };
    }

    public static UserInformationDto MapToUserInformationDto(User_Data data)
    {
        return new UserInformationDto
        {
            Id = data.Id,
            FirstName = data.FirstName,
            LastName = data.LastName,
            Email = data.Email
        };
    }
}