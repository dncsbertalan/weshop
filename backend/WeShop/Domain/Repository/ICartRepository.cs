using Domain.Dtos;
using Domain.Models;

namespace Domain.Repository;

public interface ICartRepository
{
    Task<long> CreateCartAsync(string userId);
    Task DeleteCartAsync(long cartId);
    Task<Cart?> GetCartByIdAsync(long cartId);
    Task<long?> GetCartIdFromCartItemIdAsync(long cartItemId);
    Task<long?> GetCartIdFromUserIdAsync(string userId);
    Task<CartItemDto?> GetCartItemByIdAsync(long cartItemId);
    Task<CartDto?> GetCartItemsAsync(long cartId);
    Task<bool> AddProductToCartAsync(long cartId, long productId);
    Task<bool> DeleteProductFromCartAsync(long cartId, long productId);
    Task<bool> ModifyCartItemAsync(long cartItemId, CartItemModificationData modificationData);
}
