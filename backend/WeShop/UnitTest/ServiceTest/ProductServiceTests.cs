using Domain.Dtos.Api;
using Domain.Dtos.Api.Request;
using Domain.Dtos.Api.Response.Product;
using Domain.Exceptions;
using Domain.Repository;
using Domain.Services;
using Moq;

namespace UnitTest.ServiceTest;

public class ProductServiceTests
{
    private readonly Mock<ICategoryRepository> _categoryRepositoryMock;
    private readonly Mock<IProductRepository> _productRepositoryMock;
    private readonly ProductService _productService;

    public ProductServiceTests()
    {
        _productRepositoryMock = new Mock<IProductRepository>();
        _categoryRepositoryMock = new Mock<ICategoryRepository>();
        _productService = new ProductService(_productRepositoryMock.Object, _categoryRepositoryMock.Object);
    }


    [Fact]
    public async Task CreateProductAsync_Should_Return_False_When_Invalid_Data()
    {
        // Arrange
        var dto = new CreateProductDto
        {
            Name = "",
            Price = -10,
            AvailableQuantity = -1
        };

        // Act
        var result = await _productService.CreateProductAsync(dto);

        // Assert
        Assert.False(result);
        _productRepositoryMock.Verify(r => r.CreateProductAsync(It.IsAny<CreateProductDto>()), Times.Never);
    }

    [Fact]
    public async Task CreateProductAsync_Should_Call_Repository_When_Valid_Data()
    {
        // Arrange
        var dto = new CreateProductDto
        {
            Name = "Bottle",
            Price = 10,
            AvailableQuantity = 5
        };

        _productRepositoryMock
            .Setup(r => r.CreateProductAsync(dto))
            .ReturnsAsync(true);

        // Act
        var result = await _productService.CreateProductAsync(dto);

        // Assert
        Assert.True(result);
        _productRepositoryMock.Verify(r => r.CreateProductAsync(dto), Times.Once);
    }

    [Fact]
    public async Task DeleteProductAsync_Should_Return_False_When_Product_Not_Found()
    {
        // Arrange
        _productRepositoryMock
            .Setup(r => r.GetByIdAsync(1))
            .ReturnsAsync((ProductDto?)null);

        // Act
        var result = await _productService.DeleteProductAsync(1);

        // Assert
        Assert.False(result);
        _productRepositoryMock.Verify(r => r.DeleteProductAsync(It.IsAny<long>()), Times.Never);
    }

    [Fact]
    public async Task DeleteProductAsync_Should_Call_Repository_When_Product_Exists()
    {
        // Arrange
        var existingProduct = new ProductDto { Id = 1 };
        _productRepositoryMock
            .Setup(r => r.GetByIdAsync(1))
            .ReturnsAsync(existingProduct);

        _productRepositoryMock
            .Setup(r => r.DeleteProductAsync(1))
            .ReturnsAsync(true);

        // Act
        var result = await _productService.DeleteProductAsync(1);

        // Assert
        Assert.True(result);
        _productRepositoryMock.Verify(r => r.DeleteProductAsync(1), Times.Once);
    }

    [Fact]
    public async Task GetProductImage_Should_Return_ImageResponse()
    {
        // Arrange
        var expectedImage = new ProductImageResponse
        {
            Image = [1, 2, 3],
            ImageMimeType = "image/png"
        };

        _productRepositoryMock
            .Setup(r => r.GetProductImageAsync(5))
            .ReturnsAsync(expectedImage);

        // Act
        var result = await _productService.GetProductImage(5);

        // Assert
        Assert.NotNull(result);
        Assert.Equal("image/png", result.ImageMimeType);
        _productRepositoryMock.Verify(r => r.GetProductImageAsync(5), Times.Once);
    }

    #region GetProductsAsync

    [Fact]
    public async Task GetProductsAsync_ValidRequest_ReturnsPagedResult()
    {
        // Arrange
        var filter = new ProductFilter { Page = 1, PageSize = 10, Min = 0, Max = 100, Filters = "1,2" };
        var pagedResult = new PagedResult<ProductDto>([], 0, 1, 1);
        var categoryResult = new List<CategoryDto>([new CategoryDto { Id = 1 }, new CategoryDto { Id = 2 }]);

        _productRepositoryMock
            .Setup(r => r.GetProductsAsync(filter))
            .ReturnsAsync(pagedResult);
        _categoryRepositoryMock
            .Setup(r => r.GetCategoriesAsync())
            .ReturnsAsync(categoryResult);

        // Act
        var result = await _productService.GetProductsAsync(filter);

        // Assert
        Assert.NotNull(result);
        _productRepositoryMock.Verify(r => r.GetProductsAsync(filter), Times.Once);
        _categoryRepositoryMock.Verify(r => r.GetCategoriesAsync(), Times.Once);
    }

    [Theory]
    [InlineData(0, 10, 0, 100, "Page number must be greater than 0.")]
    [InlineData(1, 0, 0, 100, "Page size must be greater than 0.")]
    [InlineData(1, 10, -5, 100, "Minimum price cannot be negative.")]
    [InlineData(1, 10, 50, 10, "Maximum price must be greater than or equal to minimum price.")]
    public async Task GetProductsAsync_InvalidInputs_ThrowsValidationException(int page, int pageSize, double min,
        double max, string expectedMessage)
    {
        // Arrange
        var filter = new ProductFilter { Page = page, PageSize = pageSize, Min = min, Max = max };

        // Act & Assert
        var exception = await Assert.ThrowsAsync<ValidationException>(() => _productService.GetProductsAsync(filter));
        Assert.Equal(expectedMessage, exception.Message);

        _productRepositoryMock.Verify(repo => repo.GetProductsAsync(It.IsAny<ProductFilter>()), Times.Never);
        _categoryRepositoryMock.Verify(r => r.GetCategoriesAsync(), Times.Never);
    }

    [Theory]
    [InlineData(1, 10, "1,2,3", "Category with identifier '2' was not found.")]
    public async Task GetProductsAsync_InvalidCategoryIdsInput_ThrowsNotFoundException(int page, int pageSize,
        string categoryIds, string expectedMessage)
    {
        // Arrange
        var filter = new ProductFilter { Page = page, PageSize = pageSize, Filters = categoryIds };
        var categoryResult = new List<CategoryDto>([new CategoryDto { Id = 1 }]);

        _categoryRepositoryMock
            .Setup(r => r.GetCategoriesAsync())
            .ReturnsAsync(categoryResult);

        // Act & Assert
        var exception = await Assert.ThrowsAsync<NotFoundException>(() => _productService.GetProductsAsync(filter));
        Assert.Equal(expectedMessage, exception.Message);

        _productRepositoryMock.Verify(repo => repo.GetProductsAsync(It.IsAny<ProductFilter>()), Times.Never);
        _categoryRepositoryMock.Verify(r => r.GetCategoriesAsync(), Times.Once);
    }

    [Theory]
    [InlineData(1, 10, "a,2,3", "Invalid categoryIds format.")]
    [InlineData(1, 10, ",2,3", "Invalid categoryIds format.")]
    [InlineData(1, 10, "1,_2,3", "Invalid categoryIds format.")]
    [InlineData(1, 10, ",,2,3", "Invalid categoryIds format.")]
    [InlineData(1, 10, "1 ,2,3", "Invalid categoryIds format.")]
    [InlineData(1, 10, "1, 2,3", "Invalid categoryIds format.")]
    [InlineData(1, 10, "  ", "Invalid categoryIds format.")]
    [InlineData(1, 10, "", "Invalid categoryIds format.")]
    [InlineData(1, 10, "!", "Invalid categoryIds format.")]
    public async Task GetProductsAsync_InvalidCategoryIdsInput_ThrowsValidationException(int page, int pageSize,
        string categoryIds, string expectedMessage)
    {
        // Arrange
        var filter = new ProductFilter { Page = page, PageSize = pageSize, Filters = categoryIds };
        var categoryResult = new List<CategoryDto>([new CategoryDto { Id = 1 }]);

        _categoryRepositoryMock
            .Setup(r => r.GetCategoriesAsync())
            .ReturnsAsync(categoryResult);

        // Act & Assert
        var exception = await Assert.ThrowsAsync<ValidationException>(() => _productService.GetProductsAsync(filter));
        Assert.Equal(expectedMessage, exception.Message);

        _productRepositoryMock.Verify(repo => repo.GetProductsAsync(It.IsAny<ProductFilter>()), Times.Never);
        _categoryRepositoryMock.Verify(r => r.GetCategoriesAsync(), Times.Once);
    }

    [Fact]
    public async Task GetProductsAsync_PageExceedsTotalPages_ThrowsBusinessLogicException()
    {
        // Arrange
        var filter = new ProductFilter { Page = 5, PageSize = 10 };
        var pagedResult = new PagedResult<ProductDto>([], 0, 2, 2);
        var categoryResult = new List<CategoryDto>();

        _categoryRepositoryMock
            .Setup(r => r.GetCategoriesAsync())
            .ReturnsAsync(categoryResult);

        _productRepositoryMock
            .Setup(repo => repo.GetProductsAsync(filter))
            .ReturnsAsync(pagedResult);

        // Act & Assert
        var exception =
            await Assert.ThrowsAsync<BusinessLogicException>(() => _productService.GetProductsAsync(filter));
        Assert.Equal("Requested page exceeds available pages.", exception.Message);

        _productRepositoryMock.Verify(repo => repo.GetProductsAsync(filter), Times.Once);
        _categoryRepositoryMock.Verify(r => r.GetCategoriesAsync(), Times.Once);
    }

    #endregion
}