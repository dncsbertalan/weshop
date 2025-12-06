using DataAccess;
using DataAccess.Models;
using Domain.Constants;
using Microsoft.AspNetCore.Identity;

namespace IntegrationTest.Seed;

public static class TestDataSeeder
{
    public const string TestAdminId = "TEST_ADMIN_ID";
    public const string TestAdminPassword = "TEST_ADMIN_password99-";
    public const string TestUserId = "TEST_USER_ID";
    public const string TestUserPassword = "TEST_USER_password99-";

    public static async Task SeedAsync(WebshopDbContext context, UserManager<User_Data> userManager,
        RoleManager<IdentityRole> roleManager)
    {
        await SeedAdminData(userManager, roleManager);
        await SeedCategoryData(context);

        await context.SaveChangesAsync();
    }

    private static async Task SeedAdminData(UserManager<User_Data> userManager, RoleManager<IdentityRole> roleManager)
    {
        var roles = new[] { RoleConstants.Admin, RoleConstants.User };

        foreach (var role in roles)
            if (!await roleManager.RoleExistsAsync(role))
                await roleManager.CreateAsync(new IdentityRole(role));

        if (!userManager.Users.Any())
        {
            var admin = new User_Data
            {
                Id = TestAdminId,
                UserName = "admin@weshop.hu",
                Email = "admin@weshop.hu",
                LastName = "Admin",
                FirstName = "Admin"
            };
            await userManager.CreateAsync(admin, TestAdminPassword);
            await userManager.AddToRoleAsync(admin, RoleConstants.Admin);
            await userManager.AddToRoleAsync(admin, RoleConstants.User);
        }
    }

    private static async Task SeedCategoryData(WebshopDbContext context)
    {
        if (!context.Categories.Any())
        {
            var categoryData = new Category_Data
            {
                Name = "Category 1",
                Description = "Description"
            };

            await context.Categories.AddAsync(categoryData);
        }
    }
}