using Domain.Dtos;
using Domain.Models;
using Domain.Repository;
using System.Threading.Tasks;

namespace Domain.Services;

public class CartService(ICartRepository _cartRepository, IUserRepository _userRepository, IProductRepository _productRepository)
{
    private async Task<bool> UserIsNotValid(string userId) => await _userRepository.GetUserById(userId) is null;

    /*private async Task<(bool, User)> UserIsValid(string userId)
    {
        var user = await _userRepository.GetUserById(userId);
        return (user != null, user);
    }*/

    public async Task<Cart?> CreateCart(string userId)
    {
        if (await UserIsNotValid(userId)) return null;

        return await _cartRepository.CreateCart(userId);
    }

    public async Task<bool> AddProductToCart(string userId, AddProductToCartDto productData)
    {
        var user = await _userRepository.GetUserById(userId);
        if (user is null) return false;

        var cart = await _cartRepository.GetCartByUserId(userId);
        if (cart is null || cart.UserId != userId) return false;

        var product = await _productRepository.GetById(productData.ProductId);
        if (product is null) return false;

        return await _cartRepository.AddProductToCart(cart.Id, productData.ProductId);
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

    public async Task<List<CartItem>?> GetCartById(string userId)
    {
        var user = await _userRepository.GetUserById(userId);
        if (user is null) return null;

        var cart = await _cartRepository.GetCartByUserId(userId);
        if (cart is null || cart.UserId != userId) return null;

        var cartItems = await _cartRepository.GetCartItems(cart.Id);

        return cartItems;
    }

    public async Task<bool> RemoveItemFromCart(string userId, long productId)
    {
        var user = await _userRepository.GetUserById(userId);
        if (user is null) return false;

        var cart = await _cartRepository.GetCartByUserId(userId);
        if (cart is null || cart.UserId != userId) return false;

        //var product = await _productRepository.GetById(productId);
        //if (product is null) return false;

        return await _cartRepository.DeleteProductFromCart(cart.Id, productId);
    }
}
