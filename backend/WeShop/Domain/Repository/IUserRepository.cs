using Domain.DTOs;

namespace Domain.Repository;

public interface IUserRepository
{
    UserDTO? GetById(int id);
}
