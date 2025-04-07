using Domain.Models;
using Domain.Repository;

namespace Domain.Services;

public class OrderService(IOrderRepository _orderRepository, IOrderItemRepository _orderItemRepository, IUserRepository _userRepository, ICartRepository _cartRepository)
{
    public async Task<bool> CreateOrder(string userId, CreateOrderData orderData)
    {
        // 1. Check whether the user exists
        // 2. Get the cart id of the user's cart
        // 3. Create a new Order
        // 4. Create the new OrderItems from the cart items
        // 5. Remove all items from the cart
        var user = await _userRepository.GetUserById(userId);
        if (user is null) return false;

        var cartId = await _cartRepository.GetCartIdFromUserId(userId);
        if (cartId is null) return false;

        var newOrderId = await _orderRepository.CreateOrder(orderData, userId);
        await _orderItemRepository.CreateOrderItemsFromCartItems(newOrderId, (long)cartId);

        await _cartRepository.DeleteCart((long)cartId);

        await _cartRepository.CreateCart(userId);

        return true;
    }
}
