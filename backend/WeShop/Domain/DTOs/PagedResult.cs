namespace Domain.Dtos;

public class PagedResult<T>(List<T> items, int totalItems, int totalPages, int currentPage)
{
    public List<T> Items { get; } = items;
    public int TotalItems { get; } = totalItems;
    public int TotalPages { get; } = totalPages;
    public int CurrentPage { get; } = currentPage;
}
