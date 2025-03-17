using Domain.Dtos;
using Domain.Models;
using System.ComponentModel.DataAnnotations;

namespace Domain.Repository;

public interface ICartRepository
{
    Task<Cart> CreateCart(string userId);
    Task<Cart?> GetCartById(long cartId);
    Task<Cart?> GetCartByUserId(string userId);
    Task<List<CartItem>> GetCartItems(long cartId);
    Task<bool> AddProductToCart(long cartId, long productId);
    Task<bool> DeleteProductFromCart(long cartId, long productId);
    Task<bool> ModifyProductInCart(CartItemModificationDto modificationData);
}
