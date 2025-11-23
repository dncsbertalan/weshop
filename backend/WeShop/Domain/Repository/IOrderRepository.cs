using Domain.Dtos.Api;
using Domain.Dtos.Api.Request;
using Domain.Dtos.Api.Response;

namespace Domain.Repository;

public interface IOrderRepository
{
    Task<Guid> CreateOrderAsync(CreateOrderRequestDto orderRequest, string userId);
    Task<OrdersDto> GetOrdersAsync(string userId);
}