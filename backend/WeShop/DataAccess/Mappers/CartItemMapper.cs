using DataAccess.Models;
using Domain.Dtos.Api;
using Domain.Dtos.Api.Response.Cart;

namespace DataAccess.Mappers;

public static class CartItemMapper
{
    public static CartItemDto MapToCartItemDto(CartItem_Data data)
    {
        return new CartItemDto
        {
            Id = data.Id,
            Quantity = data.Quantity,
            ProductId = data.Product.Id,
            Name = data.Product.Name,
            Description = data.Product.Description,
            Price = data.Product.Price,
            AvailableQuantity = data.Product.AvailableQuantity,
            Categories = [.. data.Product.Categories.Select(CategoryMapper.ToDto)],
            AddedBy = UserMapper.MapToUserInformationDto(data.AddedBy)
        };
    }
}