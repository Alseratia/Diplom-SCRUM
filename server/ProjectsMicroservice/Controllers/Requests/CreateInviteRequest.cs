using System.ComponentModel.DataAnnotations;
using ProjectsMicroservice.DatabaseContext.Enums;

namespace ProjectsMicroservice.Controllers.Requests;

public class CreateInviteRequest
{
  [Required]
  public string UserName { get; set; } = null!;
  public Role UserRole { get; set; }
}