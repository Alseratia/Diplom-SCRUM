using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using ProjectsMicroservice.DatabaseContext.Enums;

namespace ProjectsMicroservice.DatabaseContext.Models;

[Index(nameof(UserId))]
[Index(nameof(ProjectId))]
public class Invite
{
  [Key]
  public Guid Id { get; set; }
  public Role Role { get; set; }
  public DateTime CreatedAt { get; set; }
  public Guid UserId { get; set; }
  public Guid ProjectId { get; set; }
  
  [ForeignKey(nameof(UserId))]
  public User? User { get; set; }
  [ForeignKey(nameof(ProjectId))]
  public Project? Project { get; set; }
}