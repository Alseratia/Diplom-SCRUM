using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace AuthMicroservice.DataAccess.Models;

[Index(nameof(AccessToken))]
[Index(nameof(RefreshToken))]
public class Tokens
{
  [Key]
  public Guid Id { get; set; }
  public string AccessToken { get; set; } = null!;
  public string RefreshToken { get; set; } = null!;
  public DateTime ExpiresAt { get; set; }
  

  [InverseProperty("Tokens")]
  public User? User { get; set; }
}