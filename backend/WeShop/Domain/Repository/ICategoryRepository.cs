using Domain.Models;

namespace Domain.Repository;

public interface ICategoryRepository
{
    IReadOnlyCollection<Category> List();
}
