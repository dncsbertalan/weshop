using Domain.Dtos.Api.Response.Cart;
using Domain.Dtos.Api.Response.User;
using Domain.Exceptions;
using Domain.Repository;
using Domain.Services;
using Moq;

namespace UnitTest.ServiceTest;

public class CartAccessServiceTests
{
    private readonly CartAccessService _cartAccessService;
    private readonly Mock<ICartRepository> _cartRepositoryMock;

    public CartAccessServiceTests()
    {
        _cartRepositoryMock = new Mock<ICartRepository>();
        _cartAccessService = new CartAccessService(_cartRepositoryMock.Object);
    }

    [Fact]
    public async Task UserHasCartAccessAsync_ReturnsFalse_WhenCartDoesNotExist()
    {
        // Arrange
        _cartRepositoryMock
            .Setup(r => r.GetCartByIdAsync(1))
            .ReturnsAsync((CartDto?)null);

        // Act
        var result = await _cartAccessService.UserHasCartAccessAsync("user1", 1);

        // Assert
        Assert.False(result);
    }

    [Fact]
    public async Task UserHasCartAccessAsync_ReturnsTrue_WhenUserIsOwner()
    {
        // Arrange
        var cart = GetCartDto();

        _cartRepositoryMock
            .Setup(r => r.GetCartByIdAsync(1))
            .ReturnsAsync(cart);

        // Act
        var result = await _cartAccessService.UserHasCartAccessAsync("ownerUser", 1);

        // Assert
        Assert.True(result);
    }

    [Fact]
    public async Task UserHasCartAccessAsync_ReturnsTrue_WhenUserIsSharedWith()
    {
        // Arrange
        var cart = GetCartDto();

        _cartRepositoryMock
            .Setup(r => r.GetCartByIdAsync(1))
            .ReturnsAsync(cart);

        // Act
        var result = await _cartAccessService.UserHasCartAccessAsync("sharedUser", 1);

        // Assert
        Assert.True(result);
    }

    [Fact]
    public async Task UserHasCartAccessAsync_ReturnsFalse_WhenUserHasNoAccess()
    {
        // Arrange
        var cart = GetCartDto();

        _cartRepositoryMock
            .Setup(r => r.GetCartByIdAsync(1))
            .ReturnsAsync(cart);

        // Act
        var result = await _cartAccessService.UserHasCartAccessAsync("intruder", 1);

        // Assert
        Assert.False(result);
    }

    [Fact]
    public async Task UserIsCartOwnerAsync_ThrowsNotFoundException_WhenCartDoesNotExist()
    {
        // Arrange
        _cartRepositoryMock
            .Setup(r => r.GetCartByIdAsync(1))
            .ReturnsAsync((CartDto)null!);

        // Act & Assert
        await Assert.ThrowsAsync<NotFoundException>(() => _cartAccessService.UserIsCartOwnerAsync("user1", 1)
        );
    }

    [Fact]
    public async Task UserIsCartOwnerAsync_ReturnsTrue_WhenUserIsOwner()
    {
        // Arrange
        var cart = GetCartDto();

        _cartRepositoryMock
            .Setup(r => r.GetCartByIdAsync(1))
            .ReturnsAsync(cart);

        // Act
        var result = await _cartAccessService.UserIsCartOwnerAsync("ownerUser", 1);

        // Assert
        Assert.True(result);
    }

    [Fact]
    public async Task UserIsCartOwnerAsync_ReturnsFalse_WhenUserIsNotOwner()
    {
        // Arrange
        var cart = GetCartDto();

        _cartRepositoryMock
            .Setup(r => r.GetCartByIdAsync(1))
            .ReturnsAsync(cart);

        // Act
        var result = await _cartAccessService.UserIsCartOwnerAsync("otherUser", 1);

        // Assert
        Assert.False(result);
    }

    #region Helpers

    private CartDto GetCartDto()
    {
        return new CartDto
        {
            Id = 1,
            Owner = new UserInformationDto
            {
                Id = "ownerUser",
                Email = "email",
                FirstName = "firstName",
                LastName = "lastName"
            },
            SharedWith =
            [
                new UserInformationDto
                {
                    Id = "sharedUser",
                    Email = "email",
                    FirstName = "firstName",
                    LastName = "lastName"
                }
            ],
            CartItems = [],
            IsShared = true,
            PriceTotal = 100,
            Quantity = 2
        };
    }

    #endregion
}