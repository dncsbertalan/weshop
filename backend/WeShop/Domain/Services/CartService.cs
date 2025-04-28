using Domain.Dtos;
using Domain.Models;
using Domain.Repository;

namespace Domain.Services;

public class CartService(ICartRepository _cartRepository, IUserRepository _userRepository, IProductRepository _productRepository)
{
    public async Task<bool> AddProductToCartAsync(string userId, long cartId, AddProductToCartData productData)
    {
        if (!await UserHasCartAccesAsync(userId, cartId)) return false;

        var product = await _productRepository.GetByIdAsync(productData.ProductId);
        if (product is null) return false;

        return await _cartRepository.AddProductToCartAsync(cartId, productData.ProductId, userId);
    }

    public async Task<bool> AddUserToCartAsync(string ownerId, string userId, long cartId)
    {
        if (!await UserIsCartOwnerAsync(ownerId, cartId)) return false;

        var user = await _userRepository.GetUserByIdAsync(userId);
        if (user is null) return false;

        var result = await _cartRepository.AddUserToSharedCartAsync(userId, cartId);

        return result;
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

    public async Task<CartDto?> GetCartByIdAsync(string userId, long cartId)
    {
        if (await UserDoesNotHaveCartAccesAsync(userId, cartId)) return null;

        var cartItems = await _cartRepository.GetCartItemsAsync((long)cartId);

        return cartItems;
    }

    public async Task<bool> ModifyCartItemAsync(string userId, long cartId, long cartItemId, CartItemModificationData modificationData)
    {
        if (await UserDoesNotHaveCartAccesAsync(userId, cartId)) return false;

        var cartIdFromCartItem = await _cartRepository.GetCartIdFromCartItemIdAsync(cartItemId);
        if (cartIdFromCartItem is null || cartIdFromCartItem != cartId) return false;

        return await _cartRepository.ModifyCartItemAsync(cartItemId, modificationData);
    }

    public async Task<bool> RemoveItemFromCartAsync(string userId, long cartId, long cartItemId)
    {
        if (await UserDoesNotHaveCartAccesAsync(userId, cartId)) return false;

        var cartIdFromCartItem = await _cartRepository.GetCartIdFromCartItemIdAsync(cartItemId);
        if (cartIdFromCartItem is null || cartIdFromCartItem != cartId) return false;

        return await _cartRepository.DeleteProductFromCartAsync(cartId, cartItemId);
    }

    #region Helper methods

    private async Task<bool> UserDoesNotHaveCartAccesAsync(string userId, long cartId) => !await UserHasCartAccesAsync(userId, cartId);
    private async Task<bool> UserHasCartAccesAsync(string userId, long cartId)
    {
        var cart = await _cartRepository.GetCartParticipantsAsync(cartId);
        if (cart is null) return false;

        if (cart.UserId == userId) return true;

        if (cart.Participants.Contains(userId)) return true;

        return false;
    }

    private async Task<bool> UserIsNotCartOwnerAsync(string userId, long cartId) => !await UserIsCartOwnerAsync(userId, cartId);
    private async Task<bool> UserIsCartOwnerAsync(string userId, long cartId)
    {
        var cart = await _cartRepository.GetCartParticipantsAsync(cartId);
        if (cart is null) return false;

        if (cart.UserId == userId) return true;

        return false;
    }

    private async Task<bool> UserIsNotValid(string userId) => await _userRepository.GetSimpleUserByIdAsync(userId) is null;

    #endregion
}
