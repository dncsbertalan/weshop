using Domain.Dtos;
using Domain.Models;
using Riok.Mapperly.Abstractions;

namespace DataAccess.Mappers;

[Mapper]
public static partial class UserMapper
{
    public static partial UserDto ToDto(User_Data userData);
}
