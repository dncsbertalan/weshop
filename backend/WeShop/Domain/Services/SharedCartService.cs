using Domain.Exceptions;
using Domain.Models;
using Domain.Repository;

namespace Domain.Services;

public class SharedCartService(
    CartAccessService _cartAccessService,
    IUserRepository _userRepository,
    ICartRepository _cartRepository)
{
    public async Task<bool> AddUserToCartAsync(string ownerId, AddUserToCartData data, long cartId)
    {
        var userId = await _userRepository.GetUserByEmailAsync(data.Email);

        if (userId is null) throw new NotFoundException("User", data.Email);

        if (await _cartAccessService.UserHasCartAccessAsync(userId, cartId))
            throw new BusinessLogicException(data.Email + "already has cart access.");

        if (!await _cartAccessService.UserIsCartOwnerAsync(ownerId, cartId))
            throw new UserNotAuthorizedForCartActionException(ownerId, cartId, "adding user to cart");

        var result = await _cartRepository.AddUserToSharedCartAsync(userId, cartId);

        return result;
    }
}