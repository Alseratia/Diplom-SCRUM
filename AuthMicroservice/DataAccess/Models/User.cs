using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace AuthMicroservice.DataAccess.Models;

[Index(nameof(Login))]
public class User
{
  [Key]
  public Guid Id { get; set; }

  public string Name { get; set; } = null!;
  public string Login { get; set; } = null!;
  public string PasswordHash { get; set; } = null!;
  public string Salt { get; set; } = null!;
  
  public Guid? TokensId { get; set; }
  [ForeignKey("TokensId")]
  public Tokens? Tokens { get; set; }
}