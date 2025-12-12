using System.Net;
using System.Net.Http.Json;
using Domain.Dtos.Api.Request;
using IntegrationTest.Fixtures;
using Microsoft.AspNetCore.Mvc.Testing;

namespace IntegrationTest.Tests;

public class AuthenticationControllerTests(WeshopWebApplicationFactoryFixture userFactory)
    : IClassFixture<WeshopWebApplicationFactoryFixture>
{
    private readonly HttpClient _client = userFactory.CreateClient(new WebApplicationFactoryClientOptions());

    [Fact]
    public async Task Registeration_Success()
    {
        // Arrange
        var content = new RegistrationRequestDto
            { FirstName = "FirstName", LastName = "LastName", Email = "email@email.com", Password = "P4!ssword" };

        // Act
        var response = await _client.PostAsJsonAsync("/api/authentication/register", content);

        // Assert
        response.EnsureSuccessStatusCode();
    }

    [Theory]
    [InlineData("Sh0rt!", "Passwords must be at least 8 characters.")]
    [InlineData("passw0rd!", "Passwords must have at least one uppercase ('A'-'Z').")]
    [InlineData("PASSW0RD!", "Passwords must have at least one lowercase ('a'-'z').")]
    [InlineData("Password!", "Passwords must have at least one digit ('0'-'9').")]
    public async Task Registeration_NoSuccess_BadPassword(string password, string erroMessage)
    {
        // Arrange
        var content = new RegistrationRequestDto
            { FirstName = "FirstName", LastName = "LastName", Email = "email@email.com", Password = password };

        // Act
        var response = await _client.PostAsJsonAsync("/api/authentication/register", content);

        // Assert
        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        var responseString = await response.Content.ReadAsStringAsync();
        Console.WriteLine(responseString);
        Assert.Contains(erroMessage, responseString);
    }

    [Theory]
    [InlineData("email.com", "InvalidEmail")]
    [InlineData("email@@email.com", "InvalidEmail")]
    [InlineData("@email.com", "InvalidEmail")]
    [InlineData("email@", "InvalidEmail")]
    [InlineData("email()<>[],;@email.com", "is invalid, can only contain letters or digits.")]
    [InlineData("email @email.com", "is invalid, can only contain letters or digits.")]
    public async Task Registration_NoSuccess_BadEmail(string email, string erroMessage)
    {
        // Arrange
        var content = new RegistrationRequestDto
            { FirstName = "FirstName", LastName = "LastName", Email = email, Password = "Passw0rd!" };

        // Act
        var response = await _client.PostAsJsonAsync("/api/authentication/register", content);

        // Assert
        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        var responseString = await response.Content.ReadAsStringAsync();
        Assert.Contains(erroMessage, responseString);
    }
}