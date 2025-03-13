using Domain.Dtos;
using Domain.Models;
using Domain.Repository;
using Microsoft.EntityFrameworkCore;

namespace Domain.Services;

public class CartService
{
    private readonly ICartRepository _cartRepository;

    public CartService(ICartRepository cartRepository)
    {
        _cartRepository = cartRepository;
    }

    public async Task<bool> AddItemToCart(long cartId, string userId, CartItemModifyingDto productData)
    {
        return await _cartRepository.AddItemToCart(userId, productData);
    }

    public async Task<CartDto?> GetCartById(string userId, long cartId)
    {
        var cartUserId = await _cartRepository.GetUserIdByCartId(cartId);

        if (cartUserId is null || cartUserId != userId)
        {
            return null;
        }

        return await _cartRepository.GetCartById(cartId);
    }

    public bool RemoveItemFromCart(int productId)
    {
        throw new NotImplementedException();
    }
}
