using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Models;

[Table("Product")]
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
