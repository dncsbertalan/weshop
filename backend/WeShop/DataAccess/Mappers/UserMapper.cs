using DataAccess.Models;
using Domain.Dtos;
using Riok.Mapperly.Abstractions;

namespace DataAccess.Mappers;

[Mapper]
public static partial class UserMapper
{
    public static partial UserDto ToDto(User_Data userData);
}
