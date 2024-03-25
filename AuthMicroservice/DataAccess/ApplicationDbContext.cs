using AuthMicroservice.DataAccess.Models;
using Microsoft.EntityFrameworkCore;

namespace AuthMicroservice.DataAccess;

public class ApplicationDbContext : DbContext
{
  public DbSet<User> Users { get; set; } = null!;
  public DbSet<Tokens> Tokens { get; set; } = null!;
  
  public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) :
    base(options)
  { }
  
}