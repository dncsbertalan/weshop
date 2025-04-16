using Domain.Dtos;
using Domain.Models;

namespace Domain.Repository;

public interface IOrderRepository
{
    Task<Guid> CreateOrder(CreateOrderData orderData, string userId);
    Task<OrdersDto> GetOrders(string userId);
}
