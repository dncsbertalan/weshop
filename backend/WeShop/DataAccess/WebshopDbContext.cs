using DataAccess.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DataAccess;

public class WebshopDbContext : IdentityDbContext<User_Data>
{
    public WebshopDbContext(DbContextOptions<WebshopDbContext> options) : base(options) { }

    public DbSet<Address_Data> Addresses { get; set; }
    public DbSet<Cart_Data> Carts { get; set; }
    public DbSet<CartItem_Data> CartItems { get; set; }
    public DbSet<Category_Data> Categories { get; set; }
    public DbSet<Order_Data> Orders { get; set; }
    public DbSet<OrderItem_Data> OrderItems { get; set; }
    public DbSet<PaymentMethod_Data> PaymentMethods { get; set; }
    public DbSet<Product_Data> Products { get; set; }
    public DbSet<SharedCart_Data> SharedCarts { get; set; }
}
