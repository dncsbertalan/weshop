using Domain.Dtos;
using Domain.Models;

namespace Domain.Repository;

public interface IOrderRepository
{
    Task<Guid> CreateOrderAsync(CreateOrderData orderData, string userId);
    Task<OrdersDto> GetOrdersAsync(string userId);
}
