using Domain.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace WebAPI.Hubs;

[Authorize]
public class SharedCartHub(
    CartAccessService _cartAccessService) : Hub
{
    public async Task JoinGroup(long cartId)
    {
        var userId = Context.UserIdentifier!;

        if (!await _cartAccessService.UserHasCartAccessAsync(userId, cartId)) return;

        await Groups.AddToGroupAsync(Context.ConnectionId, cartId.ToString());
    }

    public async Task LeaveGroup(long cartId)
    {
        var userId = Context.UserIdentifier;

        if (!await _cartAccessService.UserHasCartAccessAsync(userId, cartId)) return;

        await Groups.RemoveFromGroupAsync(Context.ConnectionId, cartId.ToString());
    }
}