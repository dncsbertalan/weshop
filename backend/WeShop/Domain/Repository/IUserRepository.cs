using Domain.Models;

namespace Domain.Repository;

public interface IUserRepository
{
    Task<User?> GetUserById(string userId);
}
