using DataAccess.Mappers;
using DataAccess.Models;
using Domain.Dtos.Api;
using Domain.Dtos.Data;
using Domain.Models;
using Domain.Repository;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repository;

public class CartRepository(WebshopDbContext _context) : ICartRepository
{
    #region Cart

    public async Task<CartWithParticipantsDto?> GetCartParticipantsAsync(long cartId)
    {
        return await _context.Carts
            .AsNoTracking()
            .Where(cart => cart.Id == cartId)
            .Select(cart => new CartWithParticipantsDto
            {
                CartId = cart.Id,
                UserId = cart.UserId,
                Participants = cart.Participants
                    .Select(p => p.CartUserId)
                    .ToList(),
            })
            .FirstOrDefaultAsync();
    }

    public async Task<long> CreateCartAsync(string userId)
    {
        var cart = new Cart_Data
        {
            UserId = userId,
        };

        _context.Carts.Add(cart);
        await _context.SaveChangesAsync();

        return cart.Id;
    }

    public async Task DeleteCartAsync(long cartId)
    {

        var cart = await _context.Carts
            .Include(cart => cart.CartItems)
            .FirstOrDefaultAsync(cart => cart.Id == cartId);

        if (cart is null) return;

        _context.CartItems.RemoveRange(cart.CartItems);
        _context.Carts.Remove(cart);

        await _context.SaveChangesAsync();
    }

    public async Task<long?> GetCartIdFromCartItemIdAsync(long cartItemId)
    {
        var cartItem = await _context.CartItems.FindAsync(cartItemId);
        return cartItem?.CartId;
    }

    public async Task<long?> GetCartIdFromUserIdAsync(string userId)
    {
        var cart = await _context.Carts.FirstOrDefaultAsync(cart => cart.User.Id == userId);
        return cart?.Id;
    }

    #endregion

    #region Shared cart

    public async Task<bool> AddUserToSharedCartAsync(string userId, long cartId)
    {
        var cart = await _context.Carts.FindAsync(cartId);
        if (cart!.IsShared)
        {
            cart.IsShared = true;
        }

        var newData = new SharedCart_Data
        {
            CartId = cartId,
            CartUserId = userId,
            JoinedDate = DateTime.UtcNow,
        };

        _context.SharedCarts.Add(newData);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<List<CartInfoDto>> GetUserCartInfoAsync(string userId)
    {
        return await _context.SharedCarts
            .Where(sharedCart => sharedCart.CartUserId == userId)
            .Select(sharedCart => new CartInfoDto
            {
                CartId = sharedCart.CartId,
                OwnerFirstName = sharedCart.CartUser.FirstName,
                OwnerLastName = sharedCart.CartUser.LastName,
            })
            .AsNoTracking()
            .ToListAsync();
    }

    #endregion

    #region Cart items

    public async Task<bool> AddProductToCartAsync(long cartId, long productId, string userId)
    {
        var cart = await _context.Carts
            .Include(cart => cart.CartItems)
            .FirstOrDefaultAsync(cart => cart.Id == cartId);
        if (cart is null) return false;

        var product = await _context.Products.FindAsync(productId);
        if (product is null) return false;

        var cartItem = cart.CartItems.FirstOrDefault(ci => ci.ProductId == productId);
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
                UserId = userId,
            };

            _context.CartItems.Add(newCartItem);
        }

        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<bool> DeleteProductFromCartAsync(long cartId, long cartItemId)
    {
        var deletedCartItems = await _context.CartItems
            .Where(ci => ci.Id == cartItemId && ci.CartId == cartId)
            .ExecuteDeleteAsync();

        return deletedCartItems > 0;
    }

    public async Task<CartItemDto?> GetCartItemByIdAsync(long cartItemId)
    {
        var cartItem = await _context.CartItems.FindAsync(cartItemId);
        return cartItem is null ? null : CartItemMapper.Map(cartItem);
    }

    public async Task<CartDto?> GetCartItemsAsync(long cartId)
    {
        var cart = await _context.Carts
            .Include(cart => cart.CartItems)
                .ThenInclude(cartItem => cartItem.Product)
                    .ThenInclude(product => product.Categories)
            .Include(cart => cart.CartItems)
                .ThenInclude(cartItem => cartItem.AddedBy)
            .FirstOrDefaultAsync(cart => cart.Id == cartId);
        
        return cart is null ? null : CartMapper.Map(cart);
    }

    public async Task<bool> ModifyCartItemAsync(long cartItemId, CartItemModificationData modificationData)
    {
        var cartItem = await _context.CartItems.FindAsync(cartItemId);
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
}
