using Domain.Dtos.Api.Response.User;

namespace Domain.Repository;

public interface IUserRepository
{
    Task<UserDto?> GetUserByIdAsync(string userId);
    Task<string?> GetUserByEmailAsync(string email);
    Task<bool> SetActiveCartAsync(string userId, long cartId);
}