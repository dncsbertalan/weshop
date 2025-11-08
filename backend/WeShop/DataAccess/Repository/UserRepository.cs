using DataAccess.Mappers;
using DataAccess.Models;
using Domain.Dtos.Api.Response;
using Domain.Dtos.Data;
using Domain.Repository;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repository;

public class UserRepository(WebshopDbContext _context, UserManager<User_Data> _userManager) : IUserRepository
{
    public async Task<SimpleUserDto?> GetSimpleUserByIdAsync(string userId)
    {
        return await _context.Users
            .AsNoTracking()
            .Select(user => new SimpleUserDto
            {
                UserId = user.Id
            })
            .FirstOrDefaultAsync(user => user.UserId == userId);
    }

    public async Task<string?> GetUserByEmailAsync(string email)
    {
        var user = await _context.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(user => user.Email == email);
        return user?.Id;
    }

    public async Task<UserDto?> GetUserByIdAsync(string userId)
    {
        var user = await _context.Users
            .Include(user => user.OwnedCart)
            .Include(user => user.SharedCarts)
            .ThenInclude(sharedCart => sharedCart.Cart)
            .ThenInclude(cart => cart.Owner)
            .FirstOrDefaultAsync(user => user.Id == userId);

        if (user is null) return null;

        // TODO: Remove this after cart handling
        if (user.OwnedCart is null)
        {
            var cart = new Cart_Data
            {
                OwnerId = userId
            };

            _context.Carts.Add(cart);
            await _context.SaveChangesAsync();
        }

        return UserMapper.MapToUserDto(user);
    }
}