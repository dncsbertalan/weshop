using Domain.Dtos.Api.Request;
using Domain.Repository;
using Domain.Services;
using Moq;

namespace UnitTest.ServiceTest;

public class ProductServiceTests
{
    private readonly Mock<IProductRepository> _productRepositoryMock;
    private readonly ProductService _productService;

    public ProductServiceTests()
    {
        _productRepositoryMock = new Mock<IProductRepository>();
        _productService = new ProductService(_productRepositoryMock.Object);
    }
    
    [Fact]
    public async Task GetProductsAsync_Should_Return_Null_When_Page_Is_Invalid()
    {
        // Arrange
        var filter = new ProductFilter { Page = 0, PageSize = 10 };

        // Act
        var result = await _productService.GetProductsAsync(filter);

        // Assert
        Assert.Null(result);
        _productRepositoryMock.Verify(r => r.GetProductsAsync(It.IsAny<ProductFilter>()), Times.Never);
    }
}