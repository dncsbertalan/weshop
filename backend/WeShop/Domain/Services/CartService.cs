using Domain.Dtos;
using Domain.Models;
using Domain.Repository;
using System.Threading.Tasks;

namespace Domain.Services;

public class CartService(ICartRepository _cartRepository, IUserRepository _userRepository, IProductRepository _productRepository)
{
    private async Task<bool> UserIsNotValid(string userId) => await _userRepository.GetUserById(userId) is null;

    public async Task<long?> CreateCart(string userId)
    {
        if (await UserIsNotValid(userId)) return null;

        return await _cartRepository.CreateCart(userId);
    }

    public async Task<bool> AddProductToCart(string userId, AddProductToCartDto productData)
    {
        var user = await _userRepository.GetUserById(userId);
        if (user is null) return false;

        var cartId = await _cartRepository.GetCartIdFromUserId(userId);
        // If the user doesn't have a cart create one
        if (cartId is null)
        {
            cartId = await _cartRepository.CreateCart(userId);
        }

        var product = await _productRepository.GetById(productData.ProductId);
        if (product is null) return false;

        return await _cartRepository.AddProductToCart((long)cartId, productData.ProductId);
    }

    public async Task<bool> AddProductToCart_ByCartId(long cartId, string userId, AddProductToCartDto productData)
    {
        var user = await _userRepository.GetUserById(userId);
        if (user is null) return false;

        var cart = await _cartRepository.GetCartById(cartId);
        if (cart is null || cart.UserId != userId) return false;

        var product = await _productRepository.GetById(productData.ProductId);
        if (product is null) return false;

        return await _cartRepository.AddProductToCart(cartId, productData.ProductId);
    }

    public async Task<CartDto?> GetCartById(string userId)
    {
        var user = await _userRepository.GetUserById(userId);
        if (user is null) return null;

        var cartId = await _cartRepository.GetCartIdFromUserId(userId);
        if (cartId is null) return null;

        var cartItems = await _cartRepository.GetCartItems((long)cartId);

        return cartItems;
    }

    public async Task<bool> RemoveItemFromCart(string userId, long cartItemId)
    {
        var user = await _userRepository.GetUserById(userId);
        if (user is null) return false;

        var cart = await _cartRepository.GetCartIdFromUserId(userId);
        if (cart is null) return false;

        //var product = await _productRepository.GetById(productId);
        //if (product is null) return false;

        return await _cartRepository.DeleteProductFromCart((long)cart, cartItemId);
    }
}
