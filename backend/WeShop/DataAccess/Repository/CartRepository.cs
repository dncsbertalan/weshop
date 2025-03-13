using Domain.Dtos;
using Domain.Models;
using Domain.Repository;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace DataAccess.Repository;

public class CartRepository : ICartRepository
{
    private readonly WebshopDbContext _context;

    public CartRepository(WebshopDbContext context)
    {
        _context = context;
    }

    public async Task<bool> AddItemToCart(string userId, CartItemModifyingDto productData)
    {
        var user = await _context.Users.FindAsync(userId);
        if (user is null) return false;
        var product = await _context.Products.FindAsync(productData.Id);
        if (product is null) return false;

        // Check whether the user already has a cart
        var cart = await _context.Carts.Include(cart => cart.CartItems)
                                    .FirstOrDefaultAsync(cart => cart.User.Id == userId);
        if (cart is null)
        {
            cart = new Cart
            {
                User = user
            };

            _context.Carts.Add(cart);
        }

        var existingCartItem = cart.CartItems.FirstOrDefault(cartItem => cartItem.Product.Id == productData.Id);
        // If the product is not yet in the cart
        if (existingCartItem is null)
        {
            var newCartItem = new CartItem
            {
                Cart = cart,
                Quantity = productData.Quantity,
                Product = product
            };

            cart.CartItems.Add(newCartItem);
        }
        // If the product is in the cart then modify the quantity
        else
        {
            existingCartItem.Quantity = productData.Quantity;
        }

        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<CartDto?> GetCartById(long cartId)
    {
        throw new NotImplementedException();
        //return await _context.Carts.Include(cart => cart.CartItems)
          //                          .FirstOrDefaultAsync(c => c.Id == cartId);
    }

    public async Task<List<CartItemDto>> GetCartItems(string id)
    {
        var query = await _context.CartItems
            .Where(ci => ci.Cart.User.Id == id)
            .ToListAsync();

        List<CartItemDto> result = [];
        foreach (var cartItem in query)
        {
            result.Add(new CartItemDto
            {
                Id = cartItem.Id,
                Quantity = cartItem.Quantity,
                //Name = cartItem.Product.Name,
                //Description = cartItem.Product.Description,
                //Price = cartItem.Product.Price,
                //AvailableQuantity = cartItem.Product.AvailableQuantity,
                //Categories = [.. cartItem.Product.Categories],
            });
        }

        return result;
    }

    public async Task<string?> GetUserIdByCartId(long cartId)
    {
        var cart = await _context.Carts.FindAsync(cartId);
        return cart is null ? null : cart.User.Id;
    }

    public bool RemoveItemFromCart(int productId)
    {
        throw new NotImplementedException();
    }
}
