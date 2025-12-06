using Domain.Dtos.Api;
using Domain.Dtos.Api.Request;
using Domain.Dtos.Api.Response.Product;
using Domain.Exceptions;
using Domain.Repository;
using Domain.Services.Helpers;

namespace Domain.Services;

public class ProductService(IProductRepository _productRepository, ICategoryRepository _categoryRepository)
{
    public async Task<PagedResult<ProductDto>> GetProductsAsync(ProductFilter productFilter)
    {
        if (productFilter.Page < 1)
            throw new ValidationException("Page number must be greater than 0.");

        if (productFilter.PageSize < 1)
            throw new ValidationException("Page size must be greater than 0.");

        if (productFilter.MinPrice < 0)
            throw new ValidationException("Minimum price cannot be negative.");

        if (productFilter.MaxPrice < productFilter.MinPrice)
            throw new ValidationException("Maximum price must be greater than or equal to minimum price.");

        var categories = await _categoryRepository.GetCategoriesAsync();
        var existingCategoryIds = categories.Select(c => c.Id).ToHashSet();

        if (productFilter.CategoryIds is not null)
        {
            if (productFilter.CategoryIds.Contains(' ')) throw new ValidationException("Invalid categoryIds format.");

            var categoryIds = productFilter.CategoryIds.Split(',');

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
        ProductValidationHelper.ProductNameValidation(createProductDto.Name);
        ProductValidationHelper.ProductPriceValidation(createProductDto.Price);
        ProductValidationHelper.ProductAvailableQuantityValidation(createProductDto.AvailableQuantity);

        // Image validation
        if (createProductDto.Image is not null)
            ProductValidationHelper.ProductImageValidation(createProductDto.Image, createProductDto.ImageMimeType);

        // Category validation
        var categories = await _categoryRepository.GetCategoriesAsync();
        var existingCategoryIds = categories.Select(c => c.Id).ToHashSet();

        ProductValidationHelper.ProductCategoryValidation(createProductDto.CategoryIds, existingCategoryIds);

        return await _productRepository.CreateProductAsync(createProductDto);
    }

    public async Task<bool> UpdateProductAsync(long productId, string userId, UpdateProductDto updateProductDto)
    {
        var product = await _productRepository.GetByIdAsync(productId);
        if (product is null) throw new NotFoundException("Product", productId);

        if (product.IsDeleted) throw new BusinessLogicException("Product is deleted.");

        // Basic field validation
        ProductValidationHelper.ProductNameValidation(updateProductDto.Name);
        ProductValidationHelper.ProductPriceValidation(updateProductDto.Price);
        ProductValidationHelper.ProductAvailableQuantityValidation(updateProductDto.AvailableQuantity);

        // Image validation
        if (updateProductDto.Image is not null)
            ProductValidationHelper.ProductImageValidation(updateProductDto.Image, updateProductDto.ImageMimeType);

        // Category validation
        var categories = await _categoryRepository.GetCategoriesAsync();
        var existingCategoryIds = categories.Select(c => c.Id).ToHashSet();

        ProductValidationHelper.ProductCategoryValidation(updateProductDto.CategoryIds, existingCategoryIds);

        return await _productRepository.UpdateProductAsync(productId, userId, updateProductDto);
    }

    public async Task<ProductImageResponse?> GetProductImage(long productId)
    {
        var product = await _productRepository.GetByIdAsync(productId);

        if (product is null) return null;

        return await _productRepository.GetProductImageAsync(productId);
    }

    public async Task<bool> DeleteProductAsync(long productId)
    {
        var product = await _productRepository.GetByIdAsync(productId);

        if (product is null) return false;

        return await _productRepository.DeleteProductAsync(productId);
    }
}