using Domain.Dtos;
using Domain.Models;

namespace Domain.Repository;

public interface ICartRepository
{
    Task<long> CreateCartAsync(string userId);
    Task DeleteCartAsync(long cartId);
    Task<Cart?> GetCartByIdAsync(long cartId);
    Task<long?> GetCartIdFromUserIdAsync(string userId);
    Task<CartDto?> GetCartItemsAsync(long cartId);
    Task<bool> AddProductToCartAsync(long cartId, long productId);
    Task<bool> DeleteProductFromCartAsync(long cartId, long productId);
    Task<bool> ModifyProductInCartAsync(long cartId, long cartItemId, CartItemModificationData modificationData);
}
