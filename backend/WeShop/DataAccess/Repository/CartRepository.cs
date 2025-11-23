using DataAccess.Mappers;
using DataAccess.Models;
using Domain.Dtos.Api.Request;
using Domain.Dtos.Api.Response.Cart;
using Domain.Dtos.Data;
using Domain.Repository;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repository;

public class CartRepository(WebshopDbContext _context) : ICartRepository
{
    #region Shared cart

    public async Task<bool> AddUserToSharedCartAsync(string userId, long cartId)
    {
        var cart = await _context.Carts.FindAsync(cartId);
        if (!cart!.IsShared) cart.IsShared = true;

        var newData = new SharedCart_Data
        {
            CartId = cartId,
            CartUserId = userId,
            JoinedDate = DateTime.UtcNow
        };

        _context.SharedCarts.Add(newData);
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

    #region Cart

    public async Task<CartWithParticipantsDto?> GetCartParticipantsAsync(long cartId)
    {
        return await _context.Carts
            .AsNoTracking()
            .Where(cart => cart.Id == cartId)
            .Select(cart => new CartWithParticipantsDto
            {
                CartId = cart.Id,
                OwnerId = cart.OwnerId,
                Participants = cart.Participants
                    .Select(p => p.CartUserId)
                    .ToList()
            })
            .FirstOrDefaultAsync();
    }

    public async Task<CartDto?> GetCartByOwnerAsync(string userId)
    {
        var cart = await _context.Carts
            .AsNoTracking()
            .Include(cart => cart.Owner)
            .Include(cart => cart.CartItems)
            .ThenInclude(cartItem => cartItem.Product)
            .ThenInclude(product => product.Categories)
            .Include(cart => cart.CartItems)
            .ThenInclude(cartItem => cartItem.AddedBy)
            .Where(cart => cart.OwnerId == userId)
            .FirstOrDefaultAsync();

        return cart is null ? null : CartMapper.MapToCartDto(cart);
    }

    public async Task<CartDto?> GetCartByIdAsync(long cartId)
    {
        var cart = await _context.Carts
            .AsNoTracking()
            .Include(cart => cart.Owner)
            .Include(cart => cart.CartItems)
            .ThenInclude(cartItem => cartItem.Product)
            .ThenInclude(product => product.Categories)
            .Include(cart => cart.CartItems)
            .ThenInclude(cartItem => cartItem.AddedBy)
            .Where(cart => cart.Id == cartId)
            .FirstOrDefaultAsync();

        return cart is null ? null : CartMapper.MapToCartDto(cart);
    }

    public async Task<long> CreateCartAsync(string userId)
    {
        var cart = new Cart_Data
        {
            OwnerId = userId
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
        var cart = await _context.Carts.FirstOrDefaultAsync(cart => cart.Owner.Id == userId);
        return cart?.Id;
    }

    public async Task<string?> GetCartOwnerIdAsync(long cartId)
    {
        var cart = await _context.Carts.FindAsync(cartId);
        return cart?.OwnerId;
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
                UserId = userId
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
        return cartItem is null ? null : CartItemMapper.MapToCartItemDto(cartItem);
    }

    public async Task<CartDto?> GetCartItemsAsync(long cartId)
    {
        var cart = await _context.Carts
            .Include(cart => cart.Owner)
            .Include(cart => cart.CartItems)
            .ThenInclude(cartItem => cartItem.Product)
            .ThenInclude(product => product.Categories)
            .Include(cart => cart.CartItems)
            .ThenInclude(cartItem => cartItem.AddedBy)
            .FirstOrDefaultAsync(cart => cart.Id == cartId);

        return cart is null ? null : CartMapper.MapToCartDto(cart);
    }

    public async Task<bool> ModifyCartItemAsync(long cartItemId, CartItemModificationRequestDto modificationRequest)
    {
        var cartItem = await _context.CartItems.FindAsync(cartItemId);
        if (cartItem is null) return false;

        cartItem.Quantity = modificationRequest.Quantity;

        await _context.SaveChangesAsync();

        return true;
    }

    #endregion
}