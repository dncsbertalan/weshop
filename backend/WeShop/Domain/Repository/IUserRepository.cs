using Domain.Dtos.Api.Response.User;
using Domain.Dtos.Data;

namespace Domain.Repository;

public interface IUserRepository
{
    Task<UserDto?> GetUserByIdAsync(string userId);
    Task<SimpleUserDto?> GetSimpleUserByIdAsync(string userId);
    Task<string?> GetUserByEmailAsync(string email);
    Task<bool> SetActiveCartAsync(string userId, long cartId);
}