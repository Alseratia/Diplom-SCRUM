using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjectsMicroservice.DatabaseContext.Models;

public class ProjectBacklog
{
  [Key]
  public Guid Id { get; set; }
  
  [Required]
  public Guid ProjectId { get; set; }
  [ForeignKey("ProjectId")]
  public Project? Project { get; set; }
}