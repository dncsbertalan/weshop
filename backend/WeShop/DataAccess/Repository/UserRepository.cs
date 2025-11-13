using DataAccess.Mappers;
using DataAccess.Models;
using Domain.Dtos.Api.Response.User;
using Domain.Repository;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repository;

public class UserRepository(UserManager<User_Data> _userManager) : IUserRepository
{
    public async Task<string?> GetUserByEmailAsync(string email)
    {
        var user = await _userManager.FindByEmailAsync(email);
        return user?.Id;
    }

    public async Task<bool> SetActiveCartAsync(string userId, long cartId)
    {
        var user = await _userManager.FindByIdAsync(userId);

        if (user is null)
            return false;

        user.ActiveCartId = cartId;
        var result = await _userManager.UpdateAsync(user);

        return result.Succeeded;
    }

    public async Task<UserDto?> GetUserByIdAsync(string userId)
    {
        var user = await _userManager.Users
            .Include(user => user.OwnedCart)
            .Include(user => user.SharedCarts)
            .ThenInclude(sharedCart => sharedCart.Cart)
            .ThenInclude(cart => cart.Owner)
            .FirstOrDefaultAsync(user => user.Id == userId);

        return user is null ? null : UserMapper.MapToUserDto(user);
    }
}