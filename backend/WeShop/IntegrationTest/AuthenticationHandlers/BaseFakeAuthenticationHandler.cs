using System.Security.Claims;
using System.Text.Encodings.Web;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace IntegrationTest.AuthenticationHandlers;

public abstract class BaseFakeAuthenticationHandler(
    IOptionsMonitor<AuthenticationSchemeOptions> options,
    ILoggerFactory logger,
    UrlEncoder encoder)
    : AuthenticationHandler<AuthenticationSchemeOptions>(options, logger, encoder)
{
    protected abstract Claim[] GetClaims();

    protected override Task<AuthenticateResult> HandleAuthenticateAsync()
    {
        /*var claims = new[]
        {
            new Claim(ClaimTypes.Email, "test-user@weshop.hu"),
            new Claim(ClaimTypes.NameIdentifier, Guid.NewGuid().ToString()),
            new Claim(ClaimTypes.Role, RoleConstants.User),
            new Claim(ClaimTypes.Role, RoleConstants.Admin)
        };*/
        var claims = GetClaims();
        var identity = new ClaimsIdentity(claims, "Test");
        var principal = new ClaimsPrincipal(identity);
        var ticket = new AuthenticationTicket(principal, "TestScheme");

        return Task.FromResult(AuthenticateResult.Success(ticket));
    }
}