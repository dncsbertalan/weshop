using DataAccess.Mappers;
using DataAccess.Models;
using Domain.Dtos.Api.Request;
using Domain.Dtos.Api.Response;
using Domain.Repository;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repository;

public class OrderRepository(WebshopDbContext _context) : IOrderRepository
{
    public async Task<Guid> CreateOrderAsync(CreateOrderRequestDto orderRequest, string userId)
    {
        var newAddress = new Address_Data
        {
            PostCode = orderRequest.PostCode,
            CityName = orderRequest.CityName,
            StreetName = orderRequest.StreetName,
            Number = orderRequest.HouseNumber
        };

        var newOrder = new Order_Data
        {
            UserId = userId,
            Address = newAddress,
            PaymentMethodId = orderRequest.PaymentMethod == "cash" ? 1 : 2,
            IsCompleted = false,
            CreatedAt = DateTime.UtcNow
        };

        _context.Addresses.Add(newAddress);
        _context.Orders.Add(newOrder);

        await _context.SaveChangesAsync();

        return newOrder.Id;
    }

    public async Task<OrdersDto> GetOrdersAsync(string userId)
    {
        var orders = await _context.Orders
            .Include(order => order.Items)
            .Where(order => order.UserId == userId)
            .ToListAsync();

        return OrderMapper.OrdersToDto(orders);
    }
}