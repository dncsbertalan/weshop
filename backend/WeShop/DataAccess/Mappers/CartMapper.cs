using Domain.Dtos;
using Domain.Models;
using Riok.Mapperly.Abstractions;

namespace DataAccess.Mappers;

[Mapper]
public partial class CartMapper
{
    public partial CartDto ToDto(Cart cart);
}
