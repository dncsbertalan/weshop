using Domain.Dtos;
using Domain.Models;

namespace Domain.Repository;

public interface ICartRepository
{
    Task<CartDto?> GetCartById(long cartId);
    Task<string?> GetUserIdByCartId(long cartId);
    Task<List<CartItemDto>> GetCartItems(string id);

    /// <summary>
    /// Used to modify items in the cart and also to add a new item to the cart.
    /// </summary>
    /// <param name="userId">The id of the user.</param>
    /// <param name="productData">The required data to modify the product in the cart.</param>
    /// <returns>Whether the mofification was succesful or not.</returns>
    Task<bool> AddItemToCart(string userId, CartItemModifyingDto productData);
    bool RemoveItemFromCart(int productId);
}
