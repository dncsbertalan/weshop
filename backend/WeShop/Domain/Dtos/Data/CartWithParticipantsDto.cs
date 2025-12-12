namespace Domain.Dtos.Data;

public class CartWithParticipantsDto
{
    public long CartId { get; set; }
    public required string OwnerId { get; set; }
    public List<string> Participants { get; set; } = [];
}