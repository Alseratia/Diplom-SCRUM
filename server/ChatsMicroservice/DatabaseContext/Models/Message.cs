using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace ChatsMicroservice.DatabaseContext.Models;

public class Message
{
  [Key]
  public Guid Id { get; set; }
  [Required]
  public string Text { get; set; } = null!;
  public DateTime CreatedAt { get; set; }
  public Guid ChatId { get; set; }
  public Guid UserId { get; set; }

  [JsonIgnore]
  [ForeignKey(nameof(ChatId))] 
  public virtual Chat Chat { get; set; } = null!;
}