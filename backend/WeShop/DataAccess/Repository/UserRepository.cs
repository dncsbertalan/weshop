using DataAccess.Mappers;
using Domain.Models;
using Domain.Repository;

namespace DataAccess.Repository;

public class UserRepository(WebshopDbContext _context) : IUserRepository
{
    public async Task<User?> GetUserById(string userId)
    {
        var user = await _context.Users.FindAsync(userId);

        return user is null ? null : UserMapper.ToDto(user);
    }
}
