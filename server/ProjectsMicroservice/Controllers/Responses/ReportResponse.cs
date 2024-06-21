using System.ComponentModel.DataAnnotations;

namespace ProjectsMicroservice.Controllers.Responses;

public class ReportResponse
{
  [Required]
  public ICollection<ReportPoint> Points { get; set; } = null!;
}

public class ReportPoint
{
  public uint SprintNumber { get; set; }
  [Required]
  public string SprintName { get; set; } = null!;
  public uint StoryPoints { get; set; }
}