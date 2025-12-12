using System.Security.Claims;
using System.Text.Encodings.Web;
using Domain.Constants;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace IntegrationTest.AuthenticationHandlers;

public class AdminAuthenticationHandler(
    IOptionsMonitor<AuthenticationSchemeOptions> options,
    ILoggerFactory logger,
    UrlEncoder encoder)
    : BaseFakeAuthenticationHandler(options, logger, encoder)
{
    protected override Claim[] GetClaims()
    {
        return
        [
            new Claim(ClaimTypes.Email, "test-user@weshop.hu"),
            new Claim(ClaimTypes.NameIdentifier, Guid.NewGuid().ToString()),
            new Claim(ClaimTypes.Role, RoleConstants.User),
            new Claim(ClaimTypes.Role, RoleConstants.Admin)
        ];
    }
}