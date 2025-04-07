using Domain.Models;

namespace Domain.Repository;

public interface IOrderRepository
{
    Task<Guid> CreateOrder(CreateOrderData orderData, string userId);
}
