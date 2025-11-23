using Domain.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace WebAPI.Hubs;

[Authorize]
public class SharedCartHub(CartService _cartService, CartAccessService _cartAccessService) : Hub
{
    public async Task JoinGroup(long cartId)
    {
        var userId = Context.UserIdentifier;

        if (!await IsUserAuthorized(userId, cartId)) return;

        await Groups.AddToGroupAsync(Context.ConnectionId, cartId.ToString());
    }

    public async Task LeaveGroup(long cartId)
    {
        var userId = Context.UserIdentifier;

        if (!await IsUserAuthorized(userId, cartId)) return;

        await Groups.RemoveFromGroupAsync(Context.ConnectionId, cartId.ToString());
    }


    #region Helper methods

    private async Task<bool> IsUserAuthorized(string? userId, long cartId)
    {
        if (string.IsNullOrEmpty(userId)) return false;

        return await _cartAccessService.UserHasCartAccessAsync(userId, cartId);
    }

    #endregion
}