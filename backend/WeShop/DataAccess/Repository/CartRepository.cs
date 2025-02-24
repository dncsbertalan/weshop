using Domain.Models;
using Domain.Repository;

namespace DataAccess.Repository;

public class CartRepository : ICartRepository
{
    private readonly List<Cart> carts = [];

    public Cart? GetById(long id)
    {
        return carts.FirstOrDefault(cart => cart.Id == id);
    }
}
