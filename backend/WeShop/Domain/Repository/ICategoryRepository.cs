using Domain.Dtos;

namespace Domain.Repository;

public interface ICategoryRepository
{
    IReadOnlyCollection<CategoryDto> GetCategories();
}
