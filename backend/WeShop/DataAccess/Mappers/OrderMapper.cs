using DataAccess.Models;
using Domain.Dtos.Api;
using Domain.Dtos.Api.Response;

namespace DataAccess.Mappers;

public static class OrderMapper
{
    public static OrderItemDto OrderItemToDto(OrderItem_Data data)
    {
        return new OrderItemDto
        {
            ProductName = data.ProductName,
            Price = data.Price,
            Quantity = data.Quantity,
        };
    }

    public static OrderDto OrderToDto(Order_Data data)
    {
        return new OrderDto
        {
            OrderId = data.Id,
            Items = [.. data.Items.Select(OrderItemToDto)],
            CreatedAt = data.CreatedAt,
        };
    }

    public static OrdersDto OrdersToDto(List<Order_Data> data)
    {
        return new OrdersDto
        {
            Orders = [.. data.Select(OrderToDto)],
        };
    }
}
