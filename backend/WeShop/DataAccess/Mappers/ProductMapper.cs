using Domain.Dtos;
using Domain.Models;
using Riok.Mapperly.Abstractions;

namespace DataAccess.Mappers;

[Mapper]
public partial class ProductMapper
{
    public partial ProductDto ToDto(Product product);
}
