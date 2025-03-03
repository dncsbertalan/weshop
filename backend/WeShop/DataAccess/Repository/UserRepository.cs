using Domain.DTOs;
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

    // TEMPORARY
    public UserDTO? GetById(int id)
    {
        var user = _dbContext.Users.SingleOrDefault(u => u.Id == id);
        if (user == null) { return null; }

        var cart = _dbContext.Carts.SingleOrDefault(c => c.User.Id == id);
        List<CartItem> cartItems = [];
        if (cart != null)
        {
            _dbContext.CartItems.Where(item => item.Cart.Id == cart.Id).ToList();
        }

        return new UserDTO 
        {
            Id = id,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Email = user.Email,
            PasswordHash = user.PasswordHash,
            BirthDate = user.BirthDate,
            Cart = cart,
            CartItems = [.. cartItems]
        };
    }
}
