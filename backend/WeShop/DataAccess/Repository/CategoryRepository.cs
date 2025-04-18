using DataAccess.Models;
using Domain.Dtos;
using Domain.Repository;

namespace DataAccess.Repository;

public class CategoryRepository : ICategoryRepository
{
    private readonly WebshopDbContext _context;

    public CategoryRepository(WebshopDbContext context)
    {
        _context = context;
    }

    private readonly List<Category_Data> categories =
    [
        new Category_Data() { Id = 1, Name = "Plüssjátékok", Description = "Puha és ölelni való plüssfigurák gyerekeknek." },
        new Category_Data() { Id = 2, Name = "Építőjátékok", Description = "LEGO és egyéb kreatív építőkészletek minden korosztálynak." },
        new Category_Data() { Id = 3, Name = "Társasjátékok", Description = "Stratégiai, családi és partijátékok kicsiknek és nagyoknak." },
        new Category_Data() { Id = 4, Name = "Távirányítós játékok", Description = "Autók, helikopterek és más izgalmas távirányítós játékok." },
        new Category_Data() { Id = 5, Name = "Szerepjátékok", Description = "Játékkonyhák, orvosi szettek és egyéb szerepjáték kellékek." },
        new Category_Data() { Id = 6, Name = "Kültéri játékok", Description = "Sporteszközök, ugrálókötelek, homokozó szettek és felfújható medencék." },
        new Category_Data() { Id = 7, Name = "Puzzle és memóriajátékok", Description = "Fejlesztő puzzle-k és memóriajátékok különböző nehézségi szinteken." },
        new Category_Data() { Id = 8, Name = "Interaktív és oktató játékok", Description = "Tanulótabletek, beszélő babák és egyéb fejlesztő játékok." },
        new Category_Data() { Id = 9, Name = "Járművek és kisautók", Description = "Versenypályák, kisautó szettek és vonatszettek minden korosztály számára." },
        new Category_Data() { Id = 10, Name = "Művészeti és kreatív játékok", Description = "Kifestők, gyurma szettek, rajzkészletek és egyéb kreatív játékok." }
    ];

    public IReadOnlyCollection<CategoryDto> List()
    {
        var resultList = new List<CategoryDto>();
        foreach (var category in _context.Categories.ToList())
        {
            resultList.Add(new CategoryDto
            {
                Id = category.Id,
                Name = category.Name,
                Description = category.Description
            });
        }
        return resultList;
    }
}
