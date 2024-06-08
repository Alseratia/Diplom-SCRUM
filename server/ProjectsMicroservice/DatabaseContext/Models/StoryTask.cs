using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjectsMicroservice.DatabaseContext.Models;

public class StoryTask
{
  [Key]
  public Guid Id { get; set; }
  public string Title { get; set; } = null!;
  public string Text { get; set; } = null!;
  public bool IsDone { get; set; }
  public Guid UserStoryId { get; set; }
  
  [ForeignKey(nameof(UserStoryId))]
  public UserStory? UserStory { get; set; }
}