using ChatsMicroservice.DatabaseContext.Models;
using Microsoft.EntityFrameworkCore;


namespace ChatsMicroservice.DatabaseContext;

public class ApplicationDbContext : DbContext
{
  public DbSet<Message> Messages { get; set; } = null!;
  public DbSet<Chat> Chats { get; set; } = null!;
  public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) :
    base(options)
  {
  }
}