namespace Domain.Dtos.Api.Response;

public class OrderDto
{
    public Guid OrderId { get; set; }
    public DateTime CreatedAt { get; set; }
    public List<OrderItemDto> Items { get; set; }
}
