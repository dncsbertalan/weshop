using Domain.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DataAccess;

public class WebshopDbContext : IdentityDbContext<User>
{
    public WebshopDbContext(DbContextOptions<WebshopDbContext> options) : base(options) { }

    public DbSet<Address> Addresses { get; set; }
    public DbSet<Cart> Carts { get; set; }
    public DbSet<CartItem> CartItems { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderItem> OrderItems { get; set; }
    public DbSet<PaymentMethod> PaymentMethods { get; set; }
    public DbSet<Product> Products { get; set; }
}
