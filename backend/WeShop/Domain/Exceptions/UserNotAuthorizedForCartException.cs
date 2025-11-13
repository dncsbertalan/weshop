namespace Domain.Exceptions;

public class UserNotAuthorizedForCartException(string userId, long cartId)
    : Exception($"User {userId} does not have access to cart {cartId}.");