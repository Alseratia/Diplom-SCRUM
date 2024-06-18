using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ProjectsMicroservice.DatabaseContext.Enums;

namespace ProjectsMicroservice.DatabaseContext.Models;

public class Sprint
{
  [Key]
  public Guid Id { get; set; }
  public string Name { get; set; } = null!;
  public SprintStatus Status { get; set; } = SprintStatus.Planning;
  public DateTime? Start { get; set; }
  public DateTime? End { get; set; }
  public DateTime CreatedAt { get; set; }
  public Guid ProjectId { get; set; }

  [ForeignKey(nameof(ProjectId))] 
  public virtual Project Project { get; set; } = null!;
}