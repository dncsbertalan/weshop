using DataAccess.Mappers;
using Domain.Dtos;
using Domain.Models;
using Domain.Repository;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace DataAccess.Repository;

public class ProductRepository : IProductRepository
{
    private readonly WebshopDbContext _dbContext;

    public ProductRepository(WebshopDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    private readonly List<Product_Data> products =
    [
        new Product_Data() { Id = 1, Name = "Activity játszószőnyeg", Description = "Színes, fejlesztő játszószőnyeg kisbabáknak.", Price = 7488, AvailableQuantity = 21 },
        new Product_Data() { Id = 2, Name = "Fa építőkocka készlet", Description = "100 darabos, természetes fa építőkocka gyerekeknek.", Price = 5999, AvailableQuantity = 30 },
        new Product_Data() { Id = 3, Name = "Plüss maci", Description = "Puha, 40 cm-es plüss maci, barna színben.", Price = 4290, AvailableQuantity = 15 },
        new Product_Data() { Id = 4, Name = "Versenypálya szett", Description = "Autós versenypálya, 3 kisautóval és ugratóval.", Price = 11999, AvailableQuantity = 10 },
        new Product_Data() { Id = 5, Name = "Távirányítós autó", Description = "Gyors és fordulékony, piros távirányítós autó.", Price = 8999, AvailableQuantity = 25 },
        new Product_Data() { Id = 6, Name = "Puzzle 1000 darabos", Description = "Tájkép témájú, prémium minőségű puzzle.", Price = 4999, AvailableQuantity = 20 },
        new Product_Data() { Id = 7, Name = "LEGO City készlet", Description = "Rendőrségi helikopter LEGO City szett.", Price = 12999, AvailableQuantity = 18 },
        new Product_Data() { Id = 8, Name = "Interaktív baba", Description = "Beszélő és síró interaktív baba játék.", Price = 10299, AvailableQuantity = 12 },
        new Product_Data() { Id = 9, Name = "Társasjáték: Gazdálkodj okosan", Description = "Klasszikus stratégiai társasjáték családoknak.", Price = 7490, AvailableQuantity = 22 },
        new Product_Data() { Id = 10, Name = "Sportlabda készlet", Description = "3 darabos labdakészlet: foci, kosár, röplabda.", Price = 8990, AvailableQuantity = 17 },
        new Product_Data() { Id = 11, Name = "Homokozó készlet", Description = "Vödör, lapát és formák kisgyerekeknek.", Price = 2999, AvailableQuantity = 35 },
        new Product_Data() { Id = 12, Name = "Ugrálókötél", Description = "Színes ugrálókötél habszivacs markolattal.", Price = 1999, AvailableQuantity = 40 },
        new Product_Data() { Id = 13, Name = "Távirányítós helikopter", Description = "USB töltős, stabil repülési élményt biztosít.", Price = 15999, AvailableQuantity = 8 },
        new Product_Data() { Id = 14, Name = "Fajáték: vonatszett", Description = "20 darabos fa sínkészlet kisvonattal.", Price = 8990, AvailableQuantity = 14 },
        new Product_Data() { Id = 15, Name = "Elektronikus zongora", Description = "Mini zongora gyerekeknek beépített dallamokkal.", Price = 11990, AvailableQuantity = 16 },
        new Product_Data() { Id = 16, Name = "Gyermek roller", Description = "Összecsukható, állítható magasságú roller.", Price = 15990, AvailableQuantity = 12 },
        new Product_Data() { Id = 17, Name = "Játék porszívó", Description = "Hangot adó, valósághű játékporszívó gyerekeknek.", Price = 8490, AvailableQuantity = 19 },
        new Product_Data() { Id = 18, Name = "Baba babakocsi", Description = "Összecsukható, stabil baba babakocsi.", Price = 13990, AvailableQuantity = 9 },
        new Product_Data() { Id = 19, Name = "Táblajáték: sakk", Description = "Fa sakktábla bábukkal, kezdőknek és haladóknak.", Price = 7490, AvailableQuantity = 20 },
        new Product_Data() { Id = 20, Name = "Memóriajáték", Description = "Képes memóriajáték gyerekeknek és családoknak.", Price = 3990, AvailableQuantity = 30 },
        new Product_Data() { Id = 21, Name = "Játékkonyha", Description = "Fa játékkonyha sütővel és kiegészítőkkel.", Price = 17999, AvailableQuantity = 7 },
        new Product_Data() { Id = 22, Name = "Buborékfújó készlet", Description = "Buborékfújó pisztoly és utántöltő folyadék.", Price = 2490, AvailableQuantity = 50 },
        new Product_Data() { Id = 23, Name = "Kifestő készlet", Description = "50 lapos színező készlet színes ceruzákkal.", Price = 3490, AvailableQuantity = 28 },
        new Product_Data() { Id = 24, Name = "Gyurma szett", Description = "10 színű gyurma készlet formázó eszközökkel.", Price = 4490, AvailableQuantity = 26 },
        new Product_Data() { Id = 25, Name = "Távirányítós tank", Description = "Realista mozgás és hangok, katonai stílusban.", Price = 18990, AvailableQuantity = 5 },
        new Product_Data() { Id = 26, Name = "Felfújható medence", Description = "Gyerekbarát, 150 cm átmérőjű pancsoló medence.", Price = 12990, AvailableQuantity = 15 },
        new Product_Data() { Id = 27, Name = "Játék orvosi szett", Description = "Orvosi felszerelés szimulációs játékhoz.", Price = 5990, AvailableQuantity = 22 },
        new Product_Data() { Id = 28, Name = "Társasjáték: Monopoly", Description = "Klasszikus Monopoly társasjáték felnőtteknek és gyerekeknek.", Price = 10990, AvailableQuantity = 13 },
        new Product_Data() { Id = 29, Name = "Interaktív tanulótablet", Description = "ABC és számok tanítására alkalmas gyerekjáték.", Price = 13990, AvailableQuantity = 11 },
        new Product_Data() { Id = 30, Name = "Kisautó szett", Description = "10 darabos fém kisautó készlet.", Price = 6990, AvailableQuantity = 32 }
    ];

    public async Task<ProductDto?> GetById(long id)
    {
        var result = await _dbContext.Products.SingleOrDefaultAsync(product => product.Id == id);
        if (result == null)
        {
            return null;
        }
        return ProductMapper.ToDto(result);
    }

    public async Task<PagedResult<ProductDto>?> GetProducts(int page, int pageSize, string? categoryIds)
    {
        var query = _dbContext.Products.Include(product => product.Categories).AsQueryable();

        // Filtering by categories
        if (!string.IsNullOrEmpty(categoryIds))
        {
            var categoryIdList = categoryIds.Split(',').Select(long.Parse).ToList();
            query = query.Where(product => product.Categories.Any(category => categoryIdList.Contains(category.Id)));
        }

        var totalItems = await query.CountAsync();    // _dbContext.Products.CountAsync();
        var totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);

        if (page > totalPages) return null;

        var products = await query
            //await _dbContext.Products
            //.Include(product => product.Categories)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        var productDtos = products.Select(ProductMapper.ToDto).ToList();

        return new PagedResult<ProductDto>(productDtos, totalItems, totalPages, page);
    }
}
