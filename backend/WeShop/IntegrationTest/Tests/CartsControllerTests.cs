using System.Net.Http.Json;
using Domain.Dtos.Api;
using Domain.Dtos.Api.Response;
using Domain.Dtos.Api.Response.Cart;
using Domain.Models;
using FluentAssertions;
using IntegrationTest.AuthenticationHandlers;
using IntegrationTest.Fixtures;
using Microsoft.AspNetCore.Mvc.Testing;

namespace IntegrationTest.Tests;

public class CartsControllerTests(
    AuthenticatedWeshopWebApplicationFactoryFixture<UserOnlyAuthenticationHandler> factory)
    :
        IClassFixture<AuthenticatedWeshopWebApplicationFactoryFixture<UserOnlyAuthenticationHandler>>
{
    private readonly HttpClient _client = factory.CreateClient(new WebApplicationFactoryClientOptions
        { AllowAutoRedirect = false });

    [Fact]
    public async Task CreateCart_ShouldReturnOkAndCart()
    {
        var response = await _client.PostAsync("/api/carts", null);
        response.EnsureSuccessStatusCode();

        var cart = await response.Content.ReadFromJsonAsync<CartDto>();
        cart.Should().NotBeNull();
        cart.Id.Should().BeGreaterThan(0);
    }

    [Fact]
    public async Task GetCart_ShouldReturnCart_WhenExists()
    {
        // Arrange: create cart first
        var createResponse = await _client.PostAsync("/api/carts", null);
        createResponse.EnsureSuccessStatusCode();
        var createdCart = await createResponse.Content.ReadFromJsonAsync<CartDto>();

        // Act
        var getResponse = await _client.GetAsync($"/api/carts/{createdCart.Id}");
        getResponse.EnsureSuccessStatusCode();
        var fetchedCart = await getResponse.Content.ReadFromJsonAsync<CartDto>();

        // Assert
        fetchedCart.Should().NotBeNull();
        fetchedCart.Id.Should().Be(createdCart.Id);
    }

    [Fact]
    public async Task AddProductToCart_ShouldReturnOk()
    {
        // Arrange
        var productData = new AddProductToCartData
        {
            ProductId = 1
        };

        // Act
        var response = await _client.PostAsJsonAsync("/api/carts/7/products", productData);
        response.EnsureSuccessStatusCode();

        var message = await response.Content.ReadAsStringAsync();
        message.Should().Contain("successfully added");
    }

    [Fact]
    public async Task ModifyCartItem_ShouldReturnOk()
    {
        // Arrange: create cart & add product
        var cartResponse = await _client.PostAsync("/api/carts", null);
        var cart = await cartResponse.Content.ReadFromJsonAsync<CartDto>();

        var productData = new AddProductToCartData { ProductId = 1 };
        var addResponse = await _client.PostAsJsonAsync($"/api/carts/{cart.Id}/products", productData);
        addResponse.EnsureSuccessStatusCode();

        var cartItemId = 1; // depending on your DB seeding or return from AddProductToCart

        var modificationData = new CartItemModificationData
        {
            Quantity = 5
        };

        // Act
        var response = await _client.PutAsJsonAsync($"/api/carts/{cart.Id}/products/{cartItemId}", modificationData);
        response.EnsureSuccessStatusCode();

        var msg = await response.Content.ReadAsStringAsync();
        msg.Should().Contain("successfully modifyed");
    }

    [Fact]
    public async Task DeleteProductFromCart_ShouldReturnOk()
    {
        // Arrange: create cart & add product
        var cartResponse = await _client.PostAsync("/api/carts", null);
        var cart = await cartResponse.Content.ReadFromJsonAsync<CartDto>();

        var productData = new AddProductToCartData { ProductId = 1 };
        var addResponse = await _client.PostAsJsonAsync($"/api/carts/{cart.Id}/products", productData);
        addResponse.EnsureSuccessStatusCode();

        var cartItemId = 1;

        // Act
        var response = await _client.DeleteAsync($"/api/carts/{cart.Id}/products/{cartItemId}");
        response.EnsureSuccessStatusCode();
    }

    [Fact]
    public async Task AddUserToSharedCart_ShouldReturnOk()
    {
        // Arrange: create cart first
        var cartResponse = await _client.PostAsync("/api/carts", null);
        var cart = await cartResponse.Content.ReadFromJsonAsync<CartDto>();

        var userData = new AddUserToCartData
        {
            Email = "another-user@weshop.hu"
        };

        // Act
        var response = await _client.PostAsJsonAsync($"/api/carts/{cart.Id}/users", userData);
        response.EnsureSuccessStatusCode();
    }
}