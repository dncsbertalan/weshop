using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Models;

[Table("SharedCart")]
public class SharedCart_Data
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    public long Id { get; set; }

    public string CartUserId { get; set; }
    [DeleteBehavior(DeleteBehavior.NoAction)]
    [ForeignKey("CartUserId")]
    public User_Data CartUser { get; set; }

    public long CartId { get; set; }
    [DeleteBehavior(DeleteBehavior.NoAction)]
    [ForeignKey("CartId")]
    public Cart_Data Cart { get; set; }

    [DataType(DataType.Date)]
    public DateTime JoinedDate { get; set; }
}