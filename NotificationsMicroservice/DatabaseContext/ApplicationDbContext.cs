using Microsoft.EntityFrameworkCore;
using NotificationsMicroservice.DatabaseContext.Models;

namespace NotificationsMicroservice.DatabaseContext;

public class ApplicationDbContext : DbContext
{
  public DbSet<Notification> Notifications { get; set; } = null!;
  
  public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) :
    base(options)
  {
  }
}