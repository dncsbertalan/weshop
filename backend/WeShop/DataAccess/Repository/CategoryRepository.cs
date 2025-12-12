using DataAccess.Mappers;
using Domain.Dtos.Api.Response.Category;
using Domain.Repository;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repository;

public class CategoryRepository(WebshopDbContext _context) : ICategoryRepository
{
    public async Task<List<CategoryDto>> GetCategoriesAsync()
    {
        var categories = await _context.Categories.ToListAsync();
        var result = categories.Select(CategoryMapper.ToDto).ToList();
        return result;
    }
}