namespace ProjectsMicroservice.Controllers.Requests;

public class CreateEventRequest
{
  public string Name { get; set; } = null!;
  public DateTime Start { get; set; }
  public DateTime End { get; set; }
}