using Domain.Dtos.Api;
using Domain.Dtos.Api.Request;
using Domain.Dtos.Api.Response.Product;
using Domain.Exceptions;
using Domain.Repository;

namespace Domain.Services;

public class ProductService(IProductRepository _productRepository, ICategoryRepository _categoryRepository)
{
    public async Task<PagedResult<ProductDto>> GetProductsAsync(ProductFilter productFilter)
    {
        if (productFilter.Page < 1)
            throw new ValidationException("Page number must be greater than 0.");

        if (productFilter.PageSize < 1)
            throw new ValidationException("Page size must be greater than 0.");

        if (productFilter.Min < 0)
            throw new ValidationException("Minimum price cannot be negative.");

        if (productFilter.Max < productFilter.Min)
            throw new ValidationException("Maximum price must be greater than or equal to minimum price.");

        var categories = await _categoryRepository.GetCategoriesAsync();
        var existingCategoryIds = categories.Select(c => c.Id).ToHashSet();

        if (productFilter.Filters is not null)
        {
            if (productFilter.Filters.Contains(' ')) throw new ValidationException("Invalid categoryIds format.");

            var categoryIds = productFilter.Filters.Split(',');

            foreach (var idStr in categoryIds)
                if (long.TryParse(idStr, out var id))
                {
                    if (!existingCategoryIds.Contains(id))
                        throw new NotFoundException("Category", id);
                }
                else
                {
                    throw new ValidationException("Invalid categoryIds format.");
                }
        }

        var result = await _productRepository.GetProductsAsync(productFilter);

        return productFilter.Page > result.TotalPages
            ? throw new BusinessLogicException("Requested page exceeds available pages.")
            : result;
    }

    public async Task<ProductDto?> GetByIdAsync(long id)
    {
        return await _productRepository.GetByIdAsync(id);
    }

    public async Task<bool> CreateProductAsync(CreateProductDto createProductDto)
    {
        // Basic field validation
        if (string.IsNullOrWhiteSpace(createProductDto.Name))
            throw new ValidationException("Product name is required.");

        if (createProductDto.Name.Length > 200)
            throw new ValidationException("Product name cannot exceed 200 characters.");

        if (createProductDto.Price <= 0)
            throw new ValidationException("Product price must be greater than zero.");

        if (createProductDto.AvailableQuantity < 0)
            throw new ValidationException("Available quantity cannot be negative.");

        // Image validation
        if (createProductDto.Image is not null)
        {
            if (createProductDto.Image.Length == 0)
                throw new ValidationException("Product image cannot be empty.");

            if (string.IsNullOrWhiteSpace(createProductDto.ImageMimeType))
                throw new ValidationException("Image MIME type is required when providing an image.");
        }

        // Category validation
        if (createProductDto.CategoryIds is null || createProductDto.CategoryIds.Count == 0)
            throw new ValidationException("At least one category must be selected.");

        var categories = await _categoryRepository.GetCategoriesAsync();
        var existingCategoryIds = categories.Select(c => c.Id).ToHashSet();

        foreach (var categoryId in createProductDto.CategoryIds.Where(categoryId =>
                     !existingCategoryIds.Contains(categoryId)))
            throw new NotFoundException("Category", categoryId);


        return await _productRepository.CreateProductAsync(createProductDto);
    }

    public async Task<ProductImageResponse?> GetProductImage(long productId)
    {
        return await _productRepository.GetProductImageAsync(productId);
    }

    public async Task<bool> DeleteProductAsync(long productId)
    {
        var product = await _productRepository.GetByIdAsync(productId);

        if (product is null) return false;

        return await _productRepository.DeleteProductAsync(productId);
    }
}