namespace Domain.Dtos;

public class CartWithParticipantsDto
{
    public long CartId { get; set; }
    public required string UserId { get; set; }
    public List<string> Participants { get; set; } = [];
}
