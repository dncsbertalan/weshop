using Domain.Dtos.Api.Response.Category;

namespace Domain.Repository;

public interface ICategoryRepository
{
    Task<List<CategoryDto>> GetCategoriesAsync();
}