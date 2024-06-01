using AuthMicroservice.DataAccess.Models;
using AuthMicroservice.Utils;
using Microsoft.EntityFrameworkCore;

namespace AuthMicroservice.DataAccess;

public class ApplicationDbContext : DbContext
{
  public DbSet<User> Users { get; set; } = null!;
  public DbSet<Tokens> Tokens { get; set; } = null!;
  
  public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) :
    base(options)
  { }
  
  public async Task<User> CreateUserAsync(string email, string password)
  {
    var salt = HashService.GenerateSalt();
    var user = new User()
    {
      Id = Guid.NewGuid(),
      Email = email,
      Salt = salt,
      PasswordHash = HashService.GenerateHash(password, salt)
    };
    Users.Add(user);
    await SaveChangesAsync();
    
    await CreateTokens(user);
    return user;
  }

  public async Task<User?> GetUserByIdAsync(Guid id)
  {
    return await Users.Include(x => x.Tokens)
      .FirstOrDefaultAsync(x => x.Id == id);
  }

  public async Task<User?> GetByEmailAsync(string email)
  {
    return await Users.Include(x => x.Tokens)
      .FirstOrDefaultAsync(x => x.Email == email);
  }

  public async Task CreateTokens(User user)
  {
    if (user.Tokens != null)
    {
      Tokens.Remove(user.Tokens);
      user.Tokens = null;
    }
    
    var tokens = JwtTokenService.GenerateJwtTokens(user);
    Tokens.Add(tokens);
    
    tokens.User = user;
    user.Tokens = tokens;
    
    await SaveChangesAsync();
  }
}