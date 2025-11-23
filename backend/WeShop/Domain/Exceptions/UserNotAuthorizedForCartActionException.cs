namespace Domain.Exceptions;

public class UserNotAuthorizedForCartActionException(string userId, long cartId, string action)
    : Exception($"User {userId} does not authorized for {action} in cart {cartId}.");