using System.ComponentModel.DataAnnotations;

namespace ChatsMicroservice.DatabaseContext.Models;

public class Chat
{
  [Key]
  public Guid Id { get; set; }
  [Required] public string Name { get; set; } = null!;
  public string? Avatar { get; set; }
  public Guid ProjectId { get; set; }
}