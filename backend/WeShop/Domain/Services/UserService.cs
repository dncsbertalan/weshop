using Domain.Dtos.Api;
using Domain.Repository;

namespace Domain.Services;

public class UserService(IUserRepository _userRepository)
{
    public async Task<UserDto?> GetUserAsync(string userId)
    {
        return await _userRepository.GetUserByIdAsync(userId);
    }
}
