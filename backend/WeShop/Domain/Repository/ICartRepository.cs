using Domain.Dtos;
using Domain.Models;
using System.ComponentModel.DataAnnotations;

namespace Domain.Repository;

public interface ICartRepository
{
    Task CreateCart(string userId);
    Task<CartDto?> GetCartById(long cartId);
    Task<List<CartItemDto>> GetCartItems(long cartId);
    Task AddProductToCart(string userId, ProductDto productData);
    Task DeleteProductFromCart(Guid productId);
    Task ModifyProductInCart(CartItemModificationDto modificationData);
}
