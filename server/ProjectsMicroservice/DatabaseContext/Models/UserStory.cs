﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ProjectsMicroservice.DatabaseContext.Enums;

namespace ProjectsMicroservice.DatabaseContext.Models;

public class UserStory
{
  [Key]
  public Guid Id { get; set; }
  public string Title { get; set; } = null!;
  public string Text { get; set; } = null!;
  public Priority Priority { get; set; } = Priority.Medium;
  public int? Mark { get; set; }
  public StoryStatus Status { get; set; } = StoryStatus.Waiting;
  public DateTime? Start { get; set; }
  public DateTime? End { get; set; }
  public Guid? ProjectId { get; set; }
  public Guid? SprintId { get; set; }
  public Guid? UserId { get; set; }
  
  [ForeignKey(nameof(ProjectId))]
  public Project? Project { get; set; }
  [ForeignKey(nameof(SprintId))]
  public Sprint? Sprint { get; set; }
  [ForeignKey(nameof(UserId))]
  public User? User { get; set; }
  [InverseProperty("UserStory")]
  public ICollection<StoryTask>? Tasks { get; set; }
}