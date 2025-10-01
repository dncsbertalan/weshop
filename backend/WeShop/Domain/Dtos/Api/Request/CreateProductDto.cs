using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dtos.Api.Request;

public class CreateProductDto
{
    public string Name { get; set; } = string.Empty;
    public double Price { get; set; }
    public string Description { get; set; } = string.Empty;
    public int StockQuantity { get; set; }
    public List<long> CategoryIds { get; set; } = [];
    public string? Brand { get; set; }
}
