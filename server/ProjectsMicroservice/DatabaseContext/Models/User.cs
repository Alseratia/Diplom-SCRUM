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
  public virtual ICollection<Invite> Invites { get; set; } = null!;

  [InverseProperty("User")] 
  public virtual ICollection<Member> Members { get; set; } = null!;
}