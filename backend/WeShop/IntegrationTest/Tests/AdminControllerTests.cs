using System.Net;
using System.Net.Http.Headers;
using IntegrationTest.AuthenticationHandlers;
using IntegrationTest.Fixtures;
using Microsoft.AspNetCore.Mvc.Testing;

namespace IntegrationTest;

public class AdminControllerTests(
    AuthenticatedWeshopWebApplicationFactoryFixture<UserOnlyAuthenticationHandler> userFactory,
    AuthenticatedWeshopWebApplicationFactoryFixture<AdminAuthenticationHandler> adminFactory)
    :
        IClassFixture<AuthenticatedWeshopWebApplicationFactoryFixture<UserOnlyAuthenticationHandler>>,
        IClassFixture<AuthenticatedWeshopWebApplicationFactoryFixture<AdminAuthenticationHandler>>

{
    private readonly HttpClient _adminClient =
        adminFactory.CreateClient(new WebApplicationFactoryClientOptions { AllowAutoRedirect = false });

    private readonly HttpClient _userClient =
        userFactory.CreateClient(new WebApplicationFactoryClientOptions { AllowAutoRedirect = false });

    [Fact]
    public async Task CreateProduct_Success()
    {
        // Arrange
        var content = CreateCreateProductRequest();

        // Act
        var response = await _adminClient.PostAsync("/api/admin/products", content);

        // Assert
        response.EnsureSuccessStatusCode();
    }

    [Fact]
    public async Task CreateProduct_UserDoesNotHaveRequiredRole()
    {
        // Arrange
        var content = CreateCreateProductRequest();

        // Act
        var response = await _userClient.PostAsync("/api/admin/products", content);

        // Assert
        Assert.Equal(HttpStatusCode.Forbidden, response.StatusCode);
    }

    private static MultipartFormDataContent CreateCreateProductRequest()
    {
        var content = new MultipartFormDataContent();

        content.Add(new StringContent("Test Product"), "Name");
        content.Add(new StringContent("A great test product"), "Description");
        content.Add(new StringContent("99"), "Price");
        content.Add(new StringContent("10"), "AvailableQuantity");

        content.Add(new StringContent("1"), "CategoryIds");

        var imageBytes = "fake image data"u8.ToArray();
        var imageContent = new ByteArrayContent(imageBytes);
        imageContent.Headers.ContentType = MediaTypeHeaderValue.Parse("image/png");
        content.Add(imageContent, "Image", "test-image.png");
        return content;
    }
}