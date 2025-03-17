using Domain.Dtos;
using Domain.Models;
using Riok.Mapperly.Abstractions;

namespace DataAccess.Mappers;

[Mapper]
public static partial class CategoryMapper
{
    public static partial CategoryDto ToDto(Category_Data category);
}
