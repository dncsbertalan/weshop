using Domain.Dtos.Api;
using Domain.Dtos.Api.Response;
using Domain.Dtos.Api.Response.Cart;
using Domain.Models;
using Domain.Repository;

namespace Domain.Services;

public class CartService(
    ICartRepository _cartRepository,
    IUserRepository _userRepository,
    IProductRepository _productRepository,
    CartAccessService _cartAccessService)
{
    #region Helper methods

    private async Task<bool> UserIsNotValid(string userId)
    {
        return await _userRepository.GetUserByIdAsync(userId) is null;
    }

    #endregion

    #region Cart

    public async Task<long?> CreateCartAsync(string userId)
    {
        if (await UserIsNotValid(userId)) return null;

        var newCartId = await _cartRepository.CreateCartAsync(userId);
        await _userRepository.SetActiveCartAsync(userId, newCartId);

        return newCartId;
    }

    public async Task DeleteCartAsync(long cartId)
    {
        await _cartRepository.DeleteCartAsync(cartId);
    }

    public async Task<CartDto?> GetCartByIdAsync(string userId, long cartId)
    {
        if (await _cartAccessService.UserDoesNotHaveCartAccessAsync(userId, cartId)) return null;

        var cartItems = await _cartRepository.GetCartItemsAsync(cartId);

        return cartItems;
    }

    #endregion


    #region Cart items

    public async Task<bool> AddProductToCartAsync(string userId, long cartId, AddProductToCartData productData)
    {
        if (!await _cartAccessService.UserHasCartAccessAsync(userId, cartId)) return false;

        var product = await _productRepository.GetByIdAsync(productData.ProductId);
        if (product is null) return false;

        return await _cartRepository.AddProductToCartAsync(cartId, productData.ProductId, userId);
    }

    public async Task<bool> RemoveItemFromCartAsync(string userId, long cartId, long cartItemId)
    {
        if (await _cartAccessService.UserDoesNotHaveCartAccessAsync(userId, cartId)) return false;

        var cartIdFromCartItem = await _cartRepository.GetCartIdFromCartItemIdAsync(cartItemId);
        if (cartIdFromCartItem is null || cartIdFromCartItem != cartId) return false;

        return await _cartRepository.DeleteProductFromCartAsync(cartId, cartItemId);
    }

    public async Task<bool> ModifyCartItemAsync(string userId, long cartId, long cartItemId,
        CartItemModificationData modificationData)
    {
        if (await _cartAccessService.UserDoesNotHaveCartAccessAsync(userId, cartId)) return false;

        var cartIdFromCartItem = await _cartRepository.GetCartIdFromCartItemIdAsync(cartItemId);
        if (cartIdFromCartItem is null || cartIdFromCartItem != cartId) return false;

        return await _cartRepository.ModifyCartItemAsync(cartItemId, modificationData);
    }

    #endregion


    #region Shared cart

    public async Task<bool> AddUserToCartAsync(string ownerId, AddUserToCartData data, long cartId)
    {
        if (!await _cartAccessService.UserIsCartOwnerAsync(ownerId, cartId)) return false;

        var userId = await _userRepository.GetUserByEmailAsync(data.Email);
        // If the user is already added to the cart then don't add them again.
        if (userId is null || await _cartAccessService.UserHasCartAccessAsync(userId, cartId)) return false;

        var result = await _cartRepository.AddUserToSharedCartAsync(userId, cartId);

        return result;
    }

    public async Task<bool> DoesUserHasCartAccess(string userId, long cartId)
    {
        return await _cartAccessService.UserHasCartAccessAsync(userId, cartId);
    }

    #endregion
}