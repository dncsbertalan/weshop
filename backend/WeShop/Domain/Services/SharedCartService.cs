using System.Transactions;
using Domain.Dtos.Api.Request;
using Domain.Exceptions;
using Domain.Repository;

namespace Domain.Services;

public class SharedCartService(
    CartAccessService _cartAccessService,
    IUserRepository _userRepository,
    ICartRepository _cartRepository)
{
    public async Task<bool> AddUserToCartAsync(string ownerId, AddUserToCartRequestDto request, long cartId)
    {
        var cart = await _cartRepository.GetCartByIdAsync(cartId);
        if (cart is null) throw new NotFoundException("Cart", cartId);

        var userId = await _userRepository.GetUserByEmailAsync(request.Email);

        if (userId is null) throw new NotFoundException("User", request.Email);

        if (await _cartAccessService.UserHasCartAccessAsync(userId, cartId))
            throw new BusinessLogicException(request.Email + "already has cart access.");

        if (!await _cartAccessService.UserIsCartOwnerAsync(ownerId, cartId))
            throw new UserNotAuthorizedForCartActionException(ownerId, cartId, "adding user to cart");

        var result = await _cartRepository.AddUserToSharedCartAsync(userId, cartId);

        return result;
    }

    public async Task<bool> RemoveUserFromCartAsync(string ownerId, string userToRemoveId, long cartId)
    {
        var cart = await _cartRepository.GetCartByIdAsync(cartId);
        if (cart is null) throw new NotFoundException("Cart", cartId);
        if (!cart.IsShared) throw new BusinessLogicException(cartId + "is not a shared cart");

        var userToRemove = await _userRepository.GetUserByIdAsync(userToRemoveId);

        if (userToRemove is null) throw new NotFoundException("User", userToRemoveId);

        if (!await _cartAccessService.UserHasCartAccessAsync(userToRemoveId, cartId))
            throw new BusinessLogicException(userToRemoveId + "does not already have cart access.");

        if (!await _cartAccessService.UserIsCartOwnerAsync(ownerId, cartId))
            throw new UserNotAuthorizedForCartActionException(ownerId, cartId, "removing user from cart");

        using var scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled);

        var result = await _cartRepository.DeleteUserFromSharedCartAsync(userToRemoveId, cartId);

        if (!result) return false;

        if (userToRemove.ActiveCartId == cartId)
        {
            var updated = await _userRepository.SetActiveCartAsync(userToRemove.UserId, userToRemove.OwnedCartId);
            if (!updated) return false;
        }

        scope.Complete();
        return true;
    }
}