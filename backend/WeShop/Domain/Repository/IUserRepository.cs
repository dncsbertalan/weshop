using Domain.Dtos.Api;
using Domain.Dtos.Api.Response;
using Domain.Dtos.Data;

namespace Domain.Repository;

public interface IUserRepository
{
    Task<UserDto?> GetUserByIdAsync(string userId);
    Task<SimpleUserDto?> GetSimpleUserByIdAsync(string userId);
    Task<string?> GetUserByEmailAsync(string email);
}
