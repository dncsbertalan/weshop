using Domain.Exceptions;

namespace Domain.Services.Helpers;

public static class ProductValidationHelper
{
    public static void ProductNameValidation(string productName)
    {
        if (string.IsNullOrWhiteSpace(productName))
            throw new ValidationException("Product name is required.");

        if (productName.Length > 200)
            throw new ValidationException("Product name cannot exceed 200 characters.");
    }

    public static void ProductPriceValidation(double productPrice)
    {
        if (productPrice <= 0)
            throw new ValidationException("Product price must be greater than zero.");
    }

    public static void ProductAvailableQuantityValidation(int productAvailableQuantity)
    {
        if (productAvailableQuantity < 0)
            throw new ValidationException("Available quantity cannot be negative.");
    }

    public static void ProductImageValidation(byte[] productImage, string? productImageMimeType)
    {
        if (productImage.Length == 0)
            throw new ValidationException("Product image cannot be empty.");

        if (string.IsNullOrWhiteSpace(productImageMimeType))
            throw new ValidationException("Image MIME type is required when providing an image.");
    }

    public static void ProductCategoryValidation(List<long> productCategoryIds, HashSet<long> existingCategoryIds)
    {
        if (productCategoryIds is null || productCategoryIds.Count == 0)
            throw new ValidationException("At least one category must be selected.");

        foreach (var categoryId in productCategoryIds.Where(categoryId => !existingCategoryIds.Contains(categoryId)))
            throw new NotFoundException("Category", categoryId);
    }
}