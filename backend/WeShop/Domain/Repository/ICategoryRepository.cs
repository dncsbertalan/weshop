using Domain.Dtos;

namespace Domain.Repository;

public interface ICategoryRepository
{
    Task<List<CategoryDto>> GetCategoriesAsync();
}
