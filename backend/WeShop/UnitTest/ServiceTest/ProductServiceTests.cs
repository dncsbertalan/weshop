using Domain.Dtos.Api;
using Domain.Dtos.Api.Request;
using Domain.Exceptions;
using Domain.Repository;
using Domain.Services;
using Moq;

namespace UnitTest.ServiceTest;

public class ProductServiceTests
{
    private const string TooLongProductName =
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";

    private readonly Mock<ICategoryRepository> _categoryRepositoryMock;
    private readonly Mock<IProductRepository> _productRepositoryMock;
    private readonly ProductService _productService;

    public ProductServiceTests()
    {
        _productRepositoryMock = new Mock<IProductRepository>();
        _categoryRepositoryMock = new Mock<ICategoryRepository>();
        _productService = new ProductService(_productRepositoryMock.Object, _categoryRepositoryMock.Object);
    }


    #region CreateProductAsync

    [Theory]
    [InlineData("  ", 10, 5, "Product name is required.")]
    [InlineData(TooLongProductName, 10, 5, "Product name cannot exceed 200 characters.")]
    [InlineData("Product", 0, 5, "Product price must be greater than zero.")]
    [InlineData("Product", -5, 5, "Product price must be greater than zero.")]
    [InlineData("Product", 5, -1, "Available quantity cannot be negative.")]
    [InlineData("Product", 5, 5, "At least one category must be selected.")]
    public async Task CreateProductAsync_InvalidInput_ThrowsValidationException(string name, double price, int quantity,
        string expectedMessage)
    {
        // Arrange
        var dto = new CreateProductDto { Name = name, Price = price, AvailableQuantity = quantity };
        SetupProductRepositoryMock_CreateProduct(false, dto);
        SetupCategoryRepositoryMock();

        // Act & Assert
        var exception = await Assert.ThrowsAsync<ValidationException>(() => _productService.CreateProductAsync(dto));
        Assert.Equal(expectedMessage, exception.Message);

        _productRepositoryMock.Verify(r => r.CreateProductAsync(dto), Times.Never);
        _categoryRepositoryMock.Verify(r => r.GetCategoriesAsync(), Times.Never);
    }

    [Fact]
    public async Task CreateProductAsync_InvalidCategoryIdsInput_ThrowsValidationException()
    {
        // Arrange
        var dto = new CreateProductDto { Name = "Product", Price = 10, AvailableQuantity = 10, CategoryIds = [] };
        SetupProductRepositoryMock_CreateProduct(false, dto);
        SetupCategoryRepositoryMock();

        // Act & Assert
        var exception = await Assert.ThrowsAsync<ValidationException>(() => _productService.CreateProductAsync(dto));
        Assert.Equal("At least one category must be selected.", exception.Message);

        _productRepositoryMock.Verify(r => r.CreateProductAsync(dto), Times.Never);
        _categoryRepositoryMock.Verify(r => r.GetCategoriesAsync(), Times.Never);
    }

    [Fact]
    public async Task CreateProductAsync_InvalidCategoryIdsInput_ThrowsNotFoundException()
    {
        // Arrange
        var dto = new CreateProductDto { Name = "Product", Price = 10, AvailableQuantity = 10, CategoryIds = [3] };
        SetupProductRepositoryMock_CreateProduct(false, dto);
        SetupCategoryRepositoryMock();

        // Act & Assert
        var exception = await Assert.ThrowsAsync<NotFoundException>(() => _productService.CreateProductAsync(dto));
        Assert.Equal("Category with identifier '3' was not found.", exception.Message);

        _productRepositoryMock.Verify(r => r.CreateProductAsync(dto), Times.Never);
        _categoryRepositoryMock.Verify(r => r.GetCategoriesAsync(), Times.Once);
    }

    [Fact]
    public async Task CreateProductAsync_ValidInput()
    {
        // Arrange
        var dto = new CreateProductDto
        {
            Name = "Valid Product", Price = 20, AvailableQuantity = 10, CategoryIds = [1], Image = [1, 2, 3],
            ImageMimeType = "image/png"
        };

        SetupProductRepositoryMock_CreateProduct(true, dto);
        SetupCategoryRepositoryMock();

        // Act
        var result = await _productService.CreateProductAsync(dto);

        // Assert
        Assert.True(result);
        _productRepositoryMock.Verify(r => r.CreateProductAsync(dto), Times.Once);
        _categoryRepositoryMock.Verify(r => r.GetCategoriesAsync(), Times.Once);
    }

    #endregion

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

    #region Helpers

    private void SetupProductRepositoryMock_CreateProduct(bool result = true, CreateProductDto? dto = null)
    {
        _productRepositoryMock
            .Setup(r => r.CreateProductAsync(dto ?? It.IsAny<CreateProductDto>()))
            .ReturnsAsync(result);
    }

    private void SetupCategoryRepositoryMock()
    {
        _categoryRepositoryMock
            .Setup(r => r.GetCategoriesAsync())
            .ReturnsAsync([
                new CategoryDto { Id = 1, Name = "Category 1" },
                new CategoryDto { Id = 2, Name = "Category 2" }
            ]);
    }

    #endregion
}