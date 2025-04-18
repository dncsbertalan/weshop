namespace Domain.Repository;

public interface IOrderItemRepository
{
    Task<bool> CreateOrderItemsFromCartItemsAsync(Guid orderId, long cartId);
}
