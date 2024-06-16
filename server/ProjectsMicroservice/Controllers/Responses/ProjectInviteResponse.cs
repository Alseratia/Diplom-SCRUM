using ProjectsMicroservice.DatabaseContext.Enums;

namespace ProjectsMicroservice.Controllers.Responses;

public class ProjectInviteResponse
{
  public Guid Id { get; set; }
  public Role Role { get; set; }
  public DateTime CreatedAt { get; set; }

  public string UserName { get; set; } = null!;
  public string? UserAvatar { get; set; } = null!;
}