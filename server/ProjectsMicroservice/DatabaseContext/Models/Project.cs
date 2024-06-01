using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjectsMicroservice.DatabaseContext.Models;

public class Project
{
  [Key]
  public Guid Id { get; set; }
  public string Name { get; set; } = null!;
  
  [InverseProperty("Project")]
  public ICollection<ProjectUser>? ProjectUsers { get; set; }

  public Guid ProjectBacklogId { get; set; }
  [ForeignKey("ProjectBacklogId")]
  public ProjectBacklog? ProjectBacklog { get; set; }
}