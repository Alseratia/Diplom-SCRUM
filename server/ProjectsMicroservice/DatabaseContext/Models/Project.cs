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

  [Required]
  [InverseProperty(nameof(Project))]
  public virtual ICollection<Member> Members { get; set; } = null!;
  
  [Required]
  [InverseProperty(nameof(Project))] 
  public virtual ICollection<Event> Events { get; set; } = null!;

  [Required]
  [InverseProperty(nameof(Project))]
  public virtual ICollection<UserStory> UserStories { get; set; } = null!;
}