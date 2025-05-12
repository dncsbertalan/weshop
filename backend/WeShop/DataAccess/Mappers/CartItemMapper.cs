using DataAccess.Models;
using Domain.Dtos.Api;
using Domain.Models;
using Riok.Mapperly.Abstractions;

namespace DataAccess.Mappers;

[Mapper]
public static partial class CartItemMapper
{
    [MapProperty($"{nameof(CartItem_Data.Product)}.{nameof(Product_Data.Id)}", nameof(CartItemDto.ProductId))]
    [MapProperty($"{nameof(CartItem_Data.Product)}.{nameof(Product_Data.Name)}", nameof(CartItemDto.Name))]
    [MapProperty($"{nameof(CartItem_Data.Product)}.{nameof(Product_Data.Description)}", nameof(CartItemDto.Description))]
    [MapProperty($"{nameof(CartItem_Data.Product)}.{nameof(Product_Data.Price)}", nameof(CartItemDto.Price))]
    [MapProperty($"{nameof(CartItem_Data.Product)}.{nameof(Product_Data.AvailableQuantity)}", nameof(CartItemDto.AvailableQuantity))]
    public static partial CartItemDto ToDto(CartItem_Data cartItem);

    public static CartItemDto Map(CartItem_Data data) => new CartItemDto
    {
        Id = data.Id,
        Quantity = data.Quantity,
        ProductId = data.Product.Id,
        Name = data.Product.Name,
        Description = data.Product.Description,
        Price = data.Product.Price,
        AvailableQuantity = data.Product.AvailableQuantity,
        Categories = [.. data.Product.Categories.Select(CategoryMapper.ToDto)],
    };
}
