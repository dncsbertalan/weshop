namespace Domain.Repository;

public interface IOrderItemRepository
{
    Task<bool> CreateOrderItemsFromCartItems(Guid orderId, long cartId);
}
