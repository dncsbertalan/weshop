using DataAccess.Mappers;
using DataAccess.Models;
using Domain.Dtos;
using Domain.Models;
using Domain.Repository;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repository;

public class OrderRepository(WebshopDbContext _context) : IOrderRepository
{
    public async Task<Guid> CreateOrderAsync(CreateOrderData orderData, string userId)
    {
        var newAddress = new Address_Data
        {
            PostCode = orderData.PostCode,
            CityName = orderData.CityName,
            StreetName = orderData.StreetName,
            Number = orderData.HouseNumber
        };

        var newOrder = new Order_Data
        {
            UserId = userId,
            Address = newAddress,
            PaymentMethodId = orderData.PaymentMethod,
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

        var orderDtos = OrderMapper.OrdersToDto(orders);

        return orderDtos;
    }
}
