using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using ProjectsMicroservice.DatabaseContext.Enums;

namespace ProjectsMicroservice.DatabaseContext.Models;

[Index(nameof(UserId))]
[Index(nameof(ProjectId))]
public class Member
{
  [Key]
  public Guid Id { get; set; }
  public Role Role { get; set; }
  public Guid ProjectId { get; set; }
  public Guid UserId { get; set; }

  [Required]
  [ForeignKey(nameof(ProjectId))] 
  public virtual Project Project { get; set; } = null!;
  [Required]
  [ForeignKey(nameof(UserId))] 
  public virtual User User { get; set; } = null!;
}
