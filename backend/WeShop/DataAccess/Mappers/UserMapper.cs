using DataAccess.Models;
using Domain.Dtos;
using Riok.Mapperly.Abstractions;

namespace DataAccess.Mappers;

[Mapper]
public static partial class UserMapper
{
    public static partial UserDto ToDto(User_Data userData);

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
