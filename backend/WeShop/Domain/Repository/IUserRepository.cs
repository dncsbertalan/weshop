using Domain.Dtos;

namespace Domain.Repository;

public interface IUserRepository
{
    Task<UserDto?> GetUserById(string userId);
}
