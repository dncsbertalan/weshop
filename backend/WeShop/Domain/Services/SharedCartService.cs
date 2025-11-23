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
        var userId = await _userRepository.GetUserByEmailAsync(request.Email);

        if (userId is null) throw new NotFoundException("User", request.Email);

        if (await _cartAccessService.UserHasCartAccessAsync(userId, cartId))
            throw new BusinessLogicException(request.Email + "already has cart access.");

        if (!await _cartAccessService.UserIsCartOwnerAsync(ownerId, cartId))
            throw new UserNotAuthorizedForCartActionException(ownerId, cartId, "adding user to cart");

        var result = await _cartRepository.AddUserToSharedCartAsync(userId, cartId);

        return result;
    }
}