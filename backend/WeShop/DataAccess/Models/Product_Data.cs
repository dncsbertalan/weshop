using DataAccess.Models;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataAccess.Models;

[Table("Product")]
[Index(nameof(Price), Name = "IX_Price")]
[Index(nameof(AvailableQuantity), Name = "IX_AvailableQuantity")]
public class Product_Data
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    public long Id { get; set; }

    [Required]
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;

    [Required]
    public double Price { get; set; }

    [Required]
    public int AvailableQuantity { get; set; }
    public List<Category_Data> Categories { get; set; } = [];
}
