using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Models;

[Table("Address")]
public class Address
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    public int Id { get; set; }

    [Required]
    public short PostCode { get; set; }

    [Required]
    public string CityName { get; set; } = string.Empty;

    [Required]
    public string StreetName { get; set; } = string.Empty;

    [Required]
    public int Number {  get; set; }
}
