using Domain.Dtos.Api;
using Domain.Dtos.Data;
using Domain.Models;

namespace Domain.Repository;

public interface ICartRepository
{
    #region Shared cart

    Task<bool> AddUserToSharedCartAsync(string userId, long cartId);

    #endregion

    #region Cart

    Task<CartWithParticipantsDto?> GetCartParticipantsAsync(long cartId);
    Task<long> CreateCartAsync(string userId);
    Task DeleteCartAsync(long cartId);
    Task<long?> GetCartIdFromCartItemIdAsync(long cartItemId);
    Task<long?> GetCartIdFromUserIdAsync(string userId);
    Task<string?> GetCartOwnerIdAsync(long cartId);

    #endregion

    #region Cart items

    Task<bool> AddProductToCartAsync(long cartId, long productId, string userId);
    Task<bool> DeleteProductFromCartAsync(long cartId, long productId);
    Task<CartItemDto?> GetCartItemByIdAsync(long cartItemId);
    Task<CartDto?> GetCartItemsAsync(long cartId);
    Task<bool> ModifyCartItemAsync(long cartItemId, CartItemModificationData modificationData);

    #endregion
}