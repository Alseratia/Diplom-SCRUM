using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjectsMicroservice.DatabaseContext.Models;

public class User
{
  [Key]
  public Guid Id { get; set; }
  public string Name { get; set; } = null!;
  public string? Avatar { get; set; }
  
  [InverseProperty("User")]
  public ICollection<Invite>? Invites { get; set; }
  [InverseProperty("User")]
  public ICollection<Participant>? Participants { get; set; }
}