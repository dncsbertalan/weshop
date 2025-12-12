using Domain.Exceptions;
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
        var cart = await _cartRepository.GetCartByIdAsync(cartId);
        if (cart is null) return false;

        return cart.Owner.Id == userId || cart.SharedWith.Any(user => user.Id == userId);
    }

    public async Task<bool> UserIsNotCartOwnerAsync(string userId, long cartId)
    {
        return !await UserIsCartOwnerAsync(userId, cartId);
    }

    public async Task<bool> UserIsCartOwnerAsync(string userId, long cartId)
    {
        var cart = await _cartRepository.GetCartByIdAsync(cartId);
        if (cart is null) throw new NotFoundException("Cart", cartId);

        return cart.Owner.Id == userId;
    }
}