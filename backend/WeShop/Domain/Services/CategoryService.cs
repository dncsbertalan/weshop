using Domain.Dtos;
using Domain.Models;
using Domain.Repository;

namespace Domain.Services;

public class CategoryService(ICategoryRepository _repository)
{
    public async Task<List<CategoryDto>> GetCategoriesAsync()
    {
        return await _repository.GetCategoriesAsync();
    }
}
