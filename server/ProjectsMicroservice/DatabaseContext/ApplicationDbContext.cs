using Microsoft.EntityFrameworkCore;
using ProjectsMicroservice.DatabaseContext.Models;


namespace ProjectsMicroservice.DatabaseContext;

public class ApplicationDbContext : DbContext
{
  public DbSet<Project> Projects { get; set; } = null!;
  public DbSet<Member> Members { get; set; } = null!;
  public DbSet<User> Users { get; set; } = null!;
  public DbSet<Event> Events { get; set; } = null!;
  public DbSet<Invite> Invites { get; set; } = null!;
  public DbSet<Sprint> Sprints { get; set; } = null!;
  public DbSet<UserStory> UserStories { get; set; } = null!;
  public DbSet<StoryTask> Tasks { get; set; } = null!;
  public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) :
    base(options)
  {
  }
}