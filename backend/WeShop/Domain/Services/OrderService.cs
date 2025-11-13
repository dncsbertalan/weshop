using System.Transactions;
using Domain.Dtos.Api;
using Domain.Models;
using Domain.Repository;

namespace Domain.Services;

public class OrderService(
    IOrderRepository _orderRepository,
    IOrderItemRepository _orderItemRepository,
    IUserRepository _userRepository,
    ICartRepository _cartRepository)
{
    public async Task<bool> CreateOrderAsync(string userId, CreateOrderData orderData)
    {
        // Everything happens in a transaction
        using var scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled);

        // 1. Check whether the user has access to the cart
        if (!await UserHasCartAccesAsync(userId, orderData.CartId)) return false;

        // 2. Create a new Order
        var newOrderId = await _orderRepository.CreateOrderAsync(orderData, userId);
        // 3. Create the new OrderItems from the cart items
        // 4. Remove all items from the cart
        var validItems = await _orderItemRepository.CreateOrderItemsFromCartItemsAsync(newOrderId, orderData.CartId);
        if (!validItems) return false;

        var cartOwner = await _cartRepository.GetCartOwnerIdAsync(orderData.CartId);
        if (cartOwner is null) return false;
        // 5. Delete the cart. This results in deleting the associated Shared Cart.
        await _cartRepository.DeleteCartAsync(orderData.CartId);

        // 6. Create a new cart for the cart's owner
        await _cartRepository.CreateCartAsync(cartOwner);

        Thread.Sleep(1000 * 2); // Temporary simulation of a longer process
        scope.Complete();
        return true;
    }

    public async Task<OrdersDto?> GetOrdersAsync(string userId)
    {
        var orders = await _orderRepository.GetOrdersAsync(userId);

        return orders;
    }

    #region Helper methods

    private async Task<bool> UserHasCartAccesAsync(string userId, long cartId)
    {
        var cart = await _cartRepository.GetCartParticipantsAsync(cartId);
        if (cart is null) return false;

        if (cart.OwnerId == userId) return true;

        if (cart.Participants.Contains(userId)) return true;

        return false;
    }

    #endregion
}