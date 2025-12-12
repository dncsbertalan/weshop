using System.Transactions;
using Domain.Dtos.Api.Request;
using Domain.Dtos.Api.Response;
using Domain.Exceptions;
using Domain.Repository;

namespace Domain.Services;

public class OrderService(
    IOrderRepository _orderRepository,
    IOrderItemRepository _orderItemRepository,
    IUserRepository _userRepository,
    ICartRepository _cartRepository)
{
    public async Task<bool> CreateOrderAsync(string userId, CreateOrderRequestDto orderRequest)
    {
        // Everything happens in a transaction
        using var scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled);

        // Check whether the user has access to the cart
        if (!await UserHasCartAccesAsync(userId, orderRequest.CartId))
            throw new UserNotAuthorizedForCartException(userId, orderRequest.CartId);

        var cartOwner = await _cartRepository.GetCartOwnerIdAsync(orderRequest.CartId);
        if (cartOwner is null) throw new BusinessLogicException("Cart should have an owner");

        var cart = await _cartRepository.GetCartByIdAsync(orderRequest.CartId);
        if (cart is null) throw new NotFoundException("Cart", orderRequest.CartId);

        // Create a new Order
        var newOrderId = await _orderRepository.CreateOrderAsync(orderRequest, userId);
        // Create the new OrderItems from the cart items
        // Remove all items from the cart
        var validItems = await _orderItemRepository.CreateOrderItemsFromCartItemsAsync(newOrderId, orderRequest.CartId);
        if (!validItems) throw new BusinessLogicException("Cannot create order items");

        foreach (var user in cart.SharedWith)
        {
            var userDetails = await _userRepository.GetUserByIdAsync(user.Id);
            if (userDetails is null) throw new BusinessLogicException("User must exist at this point");

            if (userDetails.ActiveCartId != orderRequest.CartId) continue;

            var result = await _userRepository.SetActiveCartAsync(userDetails.UserId, userDetails.OwnedCartId);
            if (!result) throw new BusinessLogicException("Cannot activate user");
        }

        // Delete the cart. This results in deleting the associated Shared Cart.
        await _cartRepository.DeleteCartAsync(orderRequest.CartId);

        // Create a new cart for the cart's owner
        var newCartId = await _cartRepository.CreateCartAsync(cartOwner);
        await _userRepository.SetActiveCartAsync(cartOwner, newCartId);

        Thread.Sleep(1000 * 2);
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