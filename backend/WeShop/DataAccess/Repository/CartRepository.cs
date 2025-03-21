using DataAccess.Mappers;
using Domain.Dtos;
using Domain.Models;
using Domain.Repository;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repository;

public class CartRepository(WebshopDbContext _context) : ICartRepository
{
    #region Cart

    public async Task<long> CreateCart(string userId)
    {
        var user = await _context.Users.FindAsync(userId);
        var cart = new Cart_Data
        {
            User = user!
        };

        await _context.Carts.AddAsync(cart);
        await _context.SaveChangesAsync();

        return cart.Id;
    }

    public async Task<long?> GetCartIdFromUserId(string userId)
    {
        var cart = await _context.Carts.FirstOrDefaultAsync(cart => cart.User.Id == userId);
        return cart is null ? null : cart.Id;
    }

    #endregion

    #region Cart items

    public async Task<bool> AddProductToCart(long cartId, long productId)
    {
        var cart = await _context.Carts
            .Include(cart => cart.CartItems)
            .ThenInclude(cartItem => cartItem.Product)
            .FirstOrDefaultAsync(cart => cart.Id == cartId);
        if (cart is null) return false;

        var product = await _context.Products.FindAsync(productId);
        if (product is null) return false;

        var cartItem = cart.CartItems.FirstOrDefault(ci => ci.Product.Id == productId);
        // If the cart already contains the product, increase the quantity.
        if (cartItem is not null)
        {
            cartItem.Quantity++;
        }
        // Otherwise create a new CartItem_Data
        else
        {
            var newCartItem = new CartItem_Data
            {
                Product = product,
                Cart = cart,
                Quantity = 1,
            };

            await _context.CartItems.AddAsync(newCartItem);
        }

        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<bool> DeleteProductFromCart(long cartId, long cartItemId)
    {
        var deletedCartItems = await _context.CartItems
            .Where(ci => ci.Id == cartItemId && ci.Cart.Id == cartId)
            .ExecuteDeleteAsync();

        return deletedCartItems > 0;
    }

    public async Task<CartDto?> GetCartItems(long cartId)
    {
        var cart = await _context.Carts
            .Include(cart => cart.CartItems)
            .ThenInclude(cartItem => cartItem.Product)
            .ThenInclude(product => product.Categories)
            .FirstOrDefaultAsync(cart => cart.Id == cartId);
        
        return cart is null ? null : CartMapper.Map(cart);
    }

    public async Task<bool> ModifyProductInCart(long cartId, long cartItemId, CartItemModificationData modificationData)
    {
        var cart = await _context.Carts
            .Include(cart => cart.CartItems)
            .FirstOrDefaultAsync(cart => cart.Id == cartId);
        if (cart is null) return false;

        var cartItem = cart.CartItems.FirstOrDefault(ci => ci.Id == cartItemId);
        if (cartItem is null) return false;

        cartItem.Quantity = modificationData.Quantity;

        await _context.SaveChangesAsync();

        return true;
    }

    #endregion



    public async Task<bool> DeleteProductFromCart_ByProductId(long cartId, long productId)
    {
        //var cart = await _context.Carts.FindAsync(cartId);
        var cartItem = await _context.CartItems
            .Where(ci => ci.Product.Id == productId && ci.Cart.Id == cartId)
            .ExecuteDeleteAsync();

        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<Cart?> GetCartById(long cartId)
    {
        throw new NotImplementedException();
        //return await _context.Carts.FirstOrDefaultAsync(c => c.Id == cartId);
    }
}
