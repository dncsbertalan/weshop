using Domain.Dtos;
using Domain.Repository;

namespace Domain.Services;

public class AuthenticationService
{
    private readonly IUserRepository _userRepository;

    public AuthenticationService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public RegistrationDto? GetById(int id)
    {
        return null;// _userRepository.GetById(id);
    }
}
