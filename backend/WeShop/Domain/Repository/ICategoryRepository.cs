using Domain.DTOs;

namespace Domain.Repository;

public interface ICategoryRepository
{
    IReadOnlyCollection<CategoryDTO> List();
}
