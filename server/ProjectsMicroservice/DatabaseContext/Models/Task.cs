using System.ComponentModel.DataAnnotations;

namespace ProjectsMicroservice.DatabaseContext.Models;

public class Task
{
  [Key]
  public Guid Id { get; set; }
  public string Name { get; set; } = null!;
  public string Description { get; set; } = null!;
  
  public TaskStatus? Status { get; set; }
  public string? ExecutorUserId { get; set; } = null!;
}