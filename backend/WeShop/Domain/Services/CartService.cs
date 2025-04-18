using Domain.Dtos;
using Domain.Models;
using Domain.Repository;
using System.Threading.Tasks;

namespace Domain.Services;

public class CartService(ICartRepository _cartRepository, IUserRepository _userRepository, IProductRepository _productRepository)
{
    public async Task<bool> AddProductToCartAsync(string userId, AddProductToCartData productData)
    {
        var user = await _userRepository.GetUserByIdAsync(userId);
        if (user is null) return false;

        var cartId = await _cartRepository.GetCartIdFromUserIdAsync(userId);
        // If the user doesn't have a cart create one
        if (cartId is null)
        {
            cartId = await _cartRepository.CreateCartAsync(userId);
        }

        var product = await _productRepository.GetByIdAsync(productData.ProductId);
        if (product is null) return false;

        return await _cartRepository.AddProductToCartAsync((long)cartId, productData.ProductId);
    }

    public async Task<long?> CreateCartAsync(string userId)
    {
        if (await UserIsNotValid(userId)) return null;

        return await _cartRepository.CreateCartAsync(userId);
    }

    public async Task DeleteCartAsync(long cartId)
    {
        //var user = await _userRepository.GetUserById(cartId);
        //if (user is null) return;

        await _cartRepository.DeleteCartAsync(cartId);
    }

    public async Task<CartDto?> GetCartByIdAsync(string userId)
    {
        var user = await _userRepository.GetUserByIdAsync(userId);
        if (user is null) return null;

        var cartId = await _cartRepository.GetCartIdFromUserIdAsync(userId);
        if (cartId is null) return null;

        var cartItems = await _cartRepository.GetCartItemsAsync((long)cartId);

        return cartItems;
    }

    public async Task<bool> ModifyCartItemAsync(string userId, long cartItemId, CartItemModificationData modificationData)
    {
        var user = await _userRepository.GetUserByIdAsync(userId);
        if (user is null) return false;

        var cartId = await _cartRepository.GetCartIdFromUserIdAsync(userId);
        if (cartId is null) return false;

        return await _cartRepository.ModifyCartItemAsync(cartItemId, modificationData);
    }

    public async Task<bool> RemoveItemFromCartAsync(string userId, long cartItemId)
    {
        var user = await _userRepository.GetUserByIdAsync(userId);
        if (user is null) return false;

        var cartId = await _cartRepository.GetCartIdFromUserIdAsync(userId);
        if (cartId is null) return false;

        var cartIdFromCartItem = await _cartRepository.GetCartIdFromCartItemIdAsync(cartItemId);
        if (cartIdFromCartItem is null || cartIdFromCartItem != cartId) return false;

        return await _cartRepository.DeleteProductFromCartAsync((long)cartId, cartItemId);
    }

    public async Task<bool> AddProductToCart_ByCartIdAsync(long cartId, string userId, AddProductToCartData productData)
    {
        var user = await _userRepository.GetUserByIdAsync(userId);
        if (user is null) return false;

        var cart = await _cartRepository.GetCartByIdAsync(cartId);
        if (cart is null || cart.UserId != userId) return false;

        var product = await _productRepository.GetByIdAsync(productData.ProductId);
        if (product is null) return false;

        return await _cartRepository.AddProductToCartAsync(cartId, productData.ProductId);
    }

    #region Helper methods

    private async Task<bool> UserIsNotValid(string userId) => await _userRepository.GetUserByIdAsync(userId) is null;

    #endregion
}
