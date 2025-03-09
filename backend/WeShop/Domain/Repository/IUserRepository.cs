using Domain.Dtos;
using Domain.Models;

namespace Domain.Repository;

public interface IUserRepository
{
    User? RegisterAsync(RegistrationDto registrationData);
    string LoginAsync(LoginDto loginData);
}
