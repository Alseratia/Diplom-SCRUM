namespace ProjectsMicroservice.Controllers.Responses;

public class BurnDownResponse
{
  public ICollection<BurnDownPoint> Points { get; set; } = null!;
}

public class BurnDownPoint
{
  public DateOnly Date { get; set; }
  public uint ExpectedTasksLeft { get; set; }
  public uint RealTasksLeft { get; set; }
}
