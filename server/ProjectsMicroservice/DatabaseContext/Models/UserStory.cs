using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjectsMicroservice.DatabaseContext.Models;

public class UserStory
{
  [Key]
  public Guid Id { get; set; }
  public string Name { get; set; } = null!;
  public string Description { get; set; } = null!;
  
  public Guid ProjectBacklogId { get; set; }
  [ForeignKey("ProjectBacklogId")]
  public ProjectBacklog? ProjectBacklog { get; set; }
}