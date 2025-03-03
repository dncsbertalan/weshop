using Domain.DTOs;
using Domain.Repository;

namespace Domain.Services;

public class UserService
{
    private readonly IUserRepository _userRepository;

    public UserService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public UserDTO? GetById(int id)
    {
        return _userRepository.GetById(id);
    }
}
