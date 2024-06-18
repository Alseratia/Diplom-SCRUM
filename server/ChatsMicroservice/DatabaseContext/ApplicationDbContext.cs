using Microsoft.EntityFrameworkCore;
using ChatsMicroservice.DatabaseContext.Models;

namespace ChatsMicroservice.DatabaseContext;

public class ApplicationDbContext : DbContext
{
  public DbSet<Notification> Notifications { get; set; } = null!;
  
  public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) :
    base(options)
  {
  }
}