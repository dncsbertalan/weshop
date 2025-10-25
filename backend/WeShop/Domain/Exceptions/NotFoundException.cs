namespace Domain.Exceptions;

public class NotFoundException(string entityName, object identifier)
    : Exception($"{entityName} with identifier '{identifier}' was not found.");