using Domain.Dtos.Api.Request;
using Domain.Dtos.Api.Response.Cart;
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

    public async Task<bool> AddProductToCartAsync(string userId, long cartId, AddProductToCartRequestDto productRequest)
    {
        if (!await _cartAccessService.UserHasCartAccessAsync(userId, cartId)) return false;

        var product = await _productRepository.GetByIdAsync(productRequest.ProductId);
        if (product is null) return false;

        return await _cartRepository.AddProductToCartAsync(cartId, productRequest.ProductId, userId);
    }

    public async Task<bool> RemoveItemFromCartAsync(string userId, long cartId, long cartItemId)
    {
        if (await _cartAccessService.UserDoesNotHaveCartAccessAsync(userId, cartId)) return false;

        var cartIdFromCartItem = await _cartRepository.GetCartIdFromCartItemIdAsync(cartItemId);
        if (cartIdFromCartItem is null || cartIdFromCartItem != cartId) return false;

        return await _cartRepository.DeleteProductFromCartAsync(cartId, cartItemId);
    }

    public async Task<bool> ModifyCartItemAsync(string userId, long cartId, long cartItemId,
        CartItemModificationRequestDto modificationRequest)
    {
        if (await _cartAccessService.UserDoesNotHaveCartAccessAsync(userId, cartId)) return false;

        var cartIdFromCartItem = await _cartRepository.GetCartIdFromCartItemIdAsync(cartItemId);
        if (cartIdFromCartItem is null || cartIdFromCartItem != cartId) return false;

        return await _cartRepository.ModifyCartItemAsync(cartItemId, modificationRequest);
    }

    #endregion
}