using Domain.Dtos;
using Domain.Models;
using Domain.Repository;

namespace DataAccess.Repository;

public class UserRepository : IUserRepository
{
    private readonly WebshopDbContext _dbContext;

    public UserRepository(WebshopDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public string LoginAsync(LoginDto loginData)
    {
        throw new NotImplementedException();
    }

    public User? RegisterAsync(RegistrationDto registrationData)
    {
        throw new NotImplementedException();
    }
}
