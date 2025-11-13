using Domain.Repository;

namespace Domain.Services;

public class CartAccessService(ICartRepository _cartRepository)
{
    public async Task<bool> UserDoesNotHaveCartAccessAsync(string userId, long cartId)
    {
        return !await UserHasCartAccessAsync(userId, cartId);
    }

    public async Task<bool> UserHasCartAccessAsync(string userId, long cartId)
    {
        var cart = await _cartRepository.GetCartParticipantsAsync(cartId);
        if (cart is null) return false;

        return cart.OwnerId == userId || cart.Participants.Contains(userId);
    }

    public async Task<bool> UserIsNotCartOwnerAsync(string userId, long cartId)
    {
        return !await UserIsCartOwnerAsync(userId, cartId);
    }

    public async Task<bool> UserIsCartOwnerAsync(string userId, long cartId)
    {
        var cart = await _cartRepository.GetCartParticipantsAsync(cartId);
        if (cart is null) return false;

        return cart.OwnerId == userId;
    }
}