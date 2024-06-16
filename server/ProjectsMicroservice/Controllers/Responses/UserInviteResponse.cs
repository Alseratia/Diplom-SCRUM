using ProjectsMicroservice.DatabaseContext.Enums;

namespace ProjectsMicroservice.Controllers.Responses;

public class UserInviteResponse
{
  public Guid Id { get; set; }
  public Role Role { get; set; }
  public DateTime CreatedAt { get; set; }

  public string ProjectName { get; set; } = null!;
  public string? ProjectAvatar { get; set; } = null!;
}