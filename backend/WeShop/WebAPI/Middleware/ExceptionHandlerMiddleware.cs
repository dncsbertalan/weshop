using System.Net;
using System.Text.Json;
using Domain.Exceptions;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Middleware;

public class ExceptionHandlerMiddleware(RequestDelegate _next, ILogger<ExceptionHandlerMiddleware> _logger)
{
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (ValidationException exception)
        {
            await HandleDomainExceptionAsync(context, exception, HttpStatusCode.BadRequest);
        }
        catch (NotFoundException exception)
        {
            await HandleDomainExceptionAsync(context, exception, HttpStatusCode.NotFound);
        }
        catch (ConflictException exception)
        {
            await HandleDomainExceptionAsync(context, exception, HttpStatusCode.Conflict);
        }
        catch (BusinessLogicException exception)
        {
            await HandleDomainExceptionAsync(context, exception, HttpStatusCode.UnprocessableEntity);
        }
        catch (Exception exception)
        {
            _logger.LogError(exception, "Unhandled exception occurred");
            await HandleDomainExceptionAsync(context, exception, HttpStatusCode.InternalServerError, 
                "An unexpected error occurred. Please try again later.");
        }
    }
    
    private async Task HandleDomainExceptionAsync(HttpContext context, Exception exception, HttpStatusCode statusCode, string? customMessage = null)
    {
        _logger.LogWarning(exception, "Error handled by middleware");

        var problemDetails = new ProblemDetails
        {
            Status = (int)statusCode,
            Title = customMessage ?? exception.Message,
            Type = $"https://httpstatuses.com/{(int)statusCode}",
            Instance = context.TraceIdentifier,
            Detail = statusCode == HttpStatusCode.InternalServerError ? null : exception.GetType().Name
        };

        context.Response.ContentType = "application/problem+json";
        context.Response.StatusCode = (int)statusCode;

        var json = JsonSerializer.Serialize(problemDetails, new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            WriteIndented = true
        });

        await context.Response.WriteAsync(json);
    }
}