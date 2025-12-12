using Domain.Services;
using Microsoft.AspNetCore.SignalR;
using WebAPI.Hubs;
using WebAPI.Models;

namespace WebAPI.Services;

public class NotificationService(
    IHubContext<SharedCartHub> _cartHub,
    ProductService _productService,
    UserService _userService)
{
    public async Task NotifyAddedProductToCart(long cartId, long productId, string userId, CartChangeType changeType)
    {
        var product = await _productService.GetByIdAsync(productId);
        var user = await _userService.GetUserInformationAsync(userId);

        await _cartHub
            .Clients
            .Group(cartId.ToString())
            .SendAsync("CartUpdated", new CartChangedResponseDto
            {
                CartId = cartId,
                Product = product,
                ChangedByUser = user,
                ChangeType = changeType
            });
    }
}