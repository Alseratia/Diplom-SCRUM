using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace AuthMicroservice.DataAccess.Models;

[Index(nameof(Email))]
public class User
{
  [Key]
  public Guid Id { get; set; }

  public string Name { get; set; } = null!;
  public string Email { get; set; } = null!;
  public string PasswordHash { get; set; } = null!;
  public string Salt { get; set; } = null!;
  
  public Guid? TokensId { get; set; }
  [InverseProperty("User")]
  public Tokens? Tokens { get; set; }
}