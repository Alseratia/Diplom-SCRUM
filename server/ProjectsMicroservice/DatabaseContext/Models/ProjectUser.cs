using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using ProjectsMicroservice.DatabaseContext.Enums;

namespace ProjectsMicroservice.DatabaseContext.Models;

[Index(nameof(UserId))]
public class ProjectUser
{
  [Key]
  public Guid Id { get; set; }
  public ProjectUserRole Role { get; set; }
  public string UserId { get; set; } = null!;
  
  public Guid ProjectId { get; set; }
  
  [ForeignKey("ProjectId")]
  public Project? Project { get; set; }
}
