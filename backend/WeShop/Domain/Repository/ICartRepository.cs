using Domain.Models;

namespace Domain.Repository;

public interface ICartRepository
{
    Cart? GetById(long id);
}
