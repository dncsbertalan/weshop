using DataAccess.Mappers;
using DataAccess.Models;
using Domain.Dtos.Api;
using Domain.Repository;

namespace DataAccess.Repository;

public class CategoryRepository(WebshopDbContext _context) : ICategoryRepository
{
    public async Task<List<CategoryDto>> GetCategoriesAsync()
    {
        var categories = _context.Categories;
        var result = categories.Select(CategoryMapper.ToDto).ToList();
        return result;
    }
}
