using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Models;

[Table("Product")]
[Index(nameof(IsDeleted), nameof(AvailableQuantity), nameof(Price))]
[Index(nameof(Name))]
public class Product_Data
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    public long Id { get; init; }

    [Required] [MaxLength(128)] public string Name { get; set; } = string.Empty;

    [Column(TypeName = "nvarchar(max)")] public string? Description { get; set; }

    [Required] public double Price { get; set; }

    [Required] public int AvailableQuantity { get; set; }

    public bool IsDeleted { get; set; }

    public byte[]? Image { get; set; }

    [MaxLength(128)] public string? ImageMimeType { get; set; }

    // Navigation properties
    public List<Category_Data> Categories { get; set; } = [];

    // Audit properties
    public DateTime CreationDate { get; init; } = DateTime.Now;

    public DateTime? ModificationDate { get; set; }

    public string? ModifiedByUserId { get; set; }

    [ForeignKey(nameof(ModifiedByUserId))] public User_Data? ModifiedByUser { get; set; }
}