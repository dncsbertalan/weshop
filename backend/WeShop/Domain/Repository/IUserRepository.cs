using Domain.Dtos;

namespace Domain.Repository;

public interface IUserRepository
{
    Task<UserDto?> GetUserByIdAsync(string userId);
}
