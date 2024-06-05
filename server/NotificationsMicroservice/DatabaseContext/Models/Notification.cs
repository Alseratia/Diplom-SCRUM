using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace NotificationsMicroservice.DatabaseContext.Models;

[Index(nameof(UserId))]
public class Notification
{
  [Key] 
  public Guid Id { get; set; }
  public string Title { get; set; } = null!;
  public string Message { get; set; } = null!;
  public DateTime CreatedAt { get; set; }
  public bool IsRead { get; set; } = false;
  public DateTime? ReadAt { get; set; }
  public Guid UserId { get; set; }
}