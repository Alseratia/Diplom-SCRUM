using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjectsMicroservice.DatabaseContext.Models;

public class Event
{
  [Key]
  public Guid Id { get; set; }
  public string Name { get; set; } = null!;
  public DateTime Start { get; set; }
  public DateTime End { get; set; }
  public Guid ProjectId { get; set; }

  [Required]
  [ForeignKey(nameof(ProjectId))]
  public virtual Project Project { get; set; } = null!;
}