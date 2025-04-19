using DataAccess.Models;
using Domain.Repository;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repository;

public class OrderItemRepository(WebshopDbContext _context) : IOrderItemRepository
{
    public async Task<bool> CreateOrderItemsFromCartItemsAsync(Guid orderId, long cartId)
    {
        var cart = await _context.Carts
            .Include(cart => cart.CartItems)
            .ThenInclude(cartItem => cartItem.Product)
            .FirstOrDefaultAsync(cart => cart.Id == cartId);
        if (cart == null || cart.CartItems == null || cart.CartItems.Count == 0) return false;

        var quantityCheck = cart.CartItems.All(cartItem => cartItem.Quantity <= cartItem.Product.AvailableQuantity);
        if (!quantityCheck) return false;

        var orderItems = cart.CartItems.Select(cartItem => new OrderItem_Data
        {
            OrderId = orderId,
            ProductName = cartItem.Product.Name,
            Price = cartItem.Product.Price,
            Quantity = cartItem.Quantity,
            CreatedAt = DateTime.UtcNow,
        });

        cart.CartItems.ForEach(cartItem => cartItem.Product.AvailableQuantity -= cartItem.Quantity);

        _context.AddRange(orderItems);
        await _context.SaveChangesAsync();
        
        return true;
    }
}
