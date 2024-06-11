using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjectsMicroservice.DatabaseContext.Models;

public class Project
{
  [Key]
  public Guid Id { get; set; }
  public string Name { get; set; } = null!;
  public string? Avatar { get; set; }
  public DateTime CreatedAt { get; set; }
  public DateTime? ClosedAt { get; set; }
  
  [InverseProperty(nameof(Project))]
  public ICollection<Member>? Members { get; set; }
  
  [InverseProperty(nameof(Project))]
  public ICollection<Event>? Events { get; set; }
  
}