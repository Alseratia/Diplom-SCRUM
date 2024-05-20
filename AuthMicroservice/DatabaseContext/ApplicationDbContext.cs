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
  
  public User CreateUser(string email, string password, string name)
  {
    var salt = HashService.GenerateSalt();
    var user = new Models.User()
    {
      Id = Guid.NewGuid(),
      Email = email,
      Name = name,
      Salt = salt,
      PasswordHash = HashService.GenerateHash(password, salt)
    };
    
    Users.Add(user);
    SaveChanges();
    return user;
  }

  public async Task<User?> GetUserById(Guid id)
  {
    return await Users.Include(x => x.Tokens)
      .FirstOrDefaultAsync(x => x.Id == id);
  }

  public async Task<User?> GetByEmail(string email)
  {
    return await Users.Include(x => x.Tokens)
      .FirstOrDefaultAsync(x => x.Email == email);
  }
}