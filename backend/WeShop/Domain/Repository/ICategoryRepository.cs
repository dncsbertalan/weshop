using Domain.Dtos.Api;

namespace Domain.Repository;

public interface ICategoryRepository
{
    Task<List<CategoryDto>> GetCategoriesAsync();
}
