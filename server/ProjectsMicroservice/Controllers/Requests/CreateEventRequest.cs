using System.ComponentModel.DataAnnotations;

namespace ProjectsMicroservice.Controllers.Requests;

public class CreateEventRequest
{
  [Required]
  public string Name { get; set; } = null!;
  public DateTime Start { get; set; }
  public DateTime End { get; set; }
}