using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Models;

[Table("Product")]
public class Product
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    public int Id { get; set; }

    [Required]
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;

    [Required]
    public double Price { get; set; }

    [Required]
    public int AvailableQuantity { get; set; }

    //[ForeignKey("CategoryId")]
    public List<Category> Categories { get; set; } = [];
}
