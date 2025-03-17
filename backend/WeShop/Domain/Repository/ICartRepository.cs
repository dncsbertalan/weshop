using Domain.Dtos;
using Domain.Models;

namespace Domain.Repository;

public interface ICartRepository
{
    Task<long> CreateCart(string userId);
    Task<Cart?> GetCartById(long cartId);
    Task<long?> GetCartIdFromUserId(string userId);
    Task<CartDto?> GetCartItems(long cartId);
    Task<bool> AddProductToCart(long cartId, long productId);
    Task<bool> DeleteProductFromCart(long cartId, long productId);
    Task<bool> ModifyProductInCart(CartItemModificationDto modificationData);
}
