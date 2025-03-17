using DataAccess.Mappers;
using Domain.Dtos;
using Domain.Models;
using Domain.Repository;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repository;

public class CartRepository(WebshopDbContext _context) : ICartRepository
{
    public async Task<bool> AddItemToCart(string userId, CartItemModificationDto productData)
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
            cart = new Cart_Data
            {
                User = user
            };

            _context.Carts.Add(cart);
        }

        var existingCartItem = cart.CartItems.FirstOrDefault(cartItem => cartItem.Product.Id == productData.Id);
        // If the product is not yet in the cart
        if (existingCartItem is null)
        {
            var newCartItem = new CartItem_Data
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

    public async Task<bool> AddProductToCart(long cartId, long productId)
    {
        var cart = await _context.Carts.FindAsync(cartId);
        var product = await _context.Products.FindAsync(productId);

        var newCartItem = new CartItem_Data
        {
            Product = product!,
            Cart = cart!,
            Quantity = 1
        };

        await _context.CartItems.AddAsync(newCartItem);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<Cart> CreateCart(string userId)
    {
        var user = await _context.Users.FindAsync(userId);
        var cart = new Cart_Data
        {
            User = user!
        };

        await _context.Carts.AddAsync(cart);
        await _context.SaveChangesAsync();

        return  CartMapper.ToDto(cart);
    }

    public Task<bool> DeleteProductFromCart(Guid productId)
    {
        throw new NotImplementedException();
    }

    public async Task<Cart?> GetCartById(long cartId)
    {
        throw new NotImplementedException();
        //return await _context.Carts.FirstOrDefaultAsync(c => c.Id == cartId);
    }

    public async Task<Cart?> GetCartByUserId(string userId)
    {
        var cart = await _context.Carts.FirstOrDefaultAsync(cart => cart.User.Id == userId);
        return cart is null ? null : CartMapper.ToDto(cart);
    }

    public async Task<List<CartItem>> GetCartItems(long cartId)
    {
        var cartItems = await _context.CartItems
            .Include(ci => ci.Product)
            .Include(ci => ci.Cart)
            .Where(ci => ci.Cart.Id == cartId)
            .ToListAsync();

        List<CartItem> result = [];
        foreach (var cartItem in cartItems)
        {
            result.Add(CartItemMapper.ToDto(cartItem));
        }

        return result;
    }

    public async Task<string?> GetUserIdByCartId(long cartId)
    {
        var cart = await _context.Carts.FindAsync(cartId);
        return cart is null ? null : cart.User.Id;
    }

    public Task<bool> ModifyProductInCart(CartItemModificationDto modificationData)
    {
        throw new NotImplementedException();
    }
}
