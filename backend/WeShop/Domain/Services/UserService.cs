using Domain.Dtos.Api.Response.User;
using Domain.Exceptions;
using Domain.Repository;

namespace Domain.Services;

public class UserService(
    IUserRepository _userRepository,
    CartAccessService _cartAccessService,
    ICartRepository _cartRepository)
{
    public async Task<UserDto?> GetUserAsync(string userId)
    {
        return await _userRepository.GetUserByIdAsync(userId);
    }

    public async Task<UserDto?> ChangeActiveCartAsync(string userId, long cartId)
    {
        var cart = await _cartRepository.GetCartByIdAsync(cartId);
        if (cart is null) throw new NotFoundException("Cart", cartId);

        if (!await _cartAccessService.UserHasCartAccessAsync(userId, cartId))
            throw new UserNotAuthorizedForCartException(userId, cartId);

        return await _userRepository.GetUserByIdAsync(userId);
    }
}