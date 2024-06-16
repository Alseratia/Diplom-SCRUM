using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
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
  public DateTime? ReadAt { get; set; }
  
  [JsonIgnore]
  public Guid UserId { get; set; }
}