using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using AuthMicroservice.Utils;
using Microsoft.EntityFrameworkCore;

namespace AuthMicroservice.DataAccess.Models;

[Index(nameof(AccessToken))]
[Index(nameof(RefreshToken))]
public class Tokens
{
  [Key]
  public Guid Id { get; set; }
  public string AccessToken { get; set; } = TokenService.GenerateAccessToken();
  public string RefreshToken { get; set; } = TokenService.GenerateRefreshToken();
  public DateTime ExpiresAt { get; set; }
  
  public Guid? UserId { get; set; }
  [ForeignKey("UserId")]
  public User? User { get; set; }
}