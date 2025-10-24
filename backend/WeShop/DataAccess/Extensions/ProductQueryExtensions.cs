using DataAccess.Models;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Extensions;

public static class ProductQueryExtensions
{
    public static IQueryable<Product_Data> FilterByPrice(this IQueryable<Product_Data> query, double? min, double? max)
    {
        if (min.HasValue)
            query = query.Where(productData => productData.Price >= min.Value);
        
        if (max.HasValue)
            query = query.Where(productData => productData.Price <= max.Value);
        
        return query;
    }

    public static IQueryable<Product_Data> FilterByName(this IQueryable<Product_Data> query, string? name)
    {
        if (string.IsNullOrWhiteSpace(name)) return query;
        
        var lowered = name.ToLower();
        query = query.Where(productData => EF.Functions.Like(productData.Name.ToLower(), lowered));
        
        return query;
    }

    public static IQueryable<Product_Data> FilterByCategories(this IQueryable<Product_Data> query, string? categoryIds)
    {
        if (string.IsNullOrEmpty(categoryIds)) return query;
        
        var ids = categoryIds.Split(',').Select(long.Parse).ToList();
        query = query.Where(productData => productData.Categories.Any(c => ids.Contains(c.Id)));
        return query;
    }

    public static IQueryable<Product_Data> AvailableAndNotDeleted(this IQueryable<Product_Data> query)
    {
        return query.Where(productData => productData.AvailableQuantity > 0 && !productData.IsDeleted);
    }
}
