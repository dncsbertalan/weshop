using DataAccess.Mappers;
using Domain.Dtos.Api;
using Domain.Dtos.Data;
using Domain.Repository;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repository;

public class UserRepository(WebshopDbContext _context) : IUserRepository
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
        //var user = await _context.Users.FindAsync(userId);
        var user = await _context.Users
            .Include(user => user.Cart)
            .Include(user => user.SharedCarts)
                .ThenInclude(sharedCart => sharedCart.Cart)
                .ThenInclude(cart => cart.User)
            .FirstOrDefaultAsync(user => user.Id == userId);

        return user is null ? null : UserMapper.MapToUserDto(user);
    }
}
