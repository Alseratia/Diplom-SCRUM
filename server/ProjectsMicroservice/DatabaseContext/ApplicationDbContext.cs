using Microsoft.EntityFrameworkCore;
using ProjectsMicroservice.DatabaseContext.Models;


namespace ProjectsMicroservice.DatabaseContext;

public class ApplicationDbContext : DbContext
{
  public DbSet<Project> Projects { get; set; } = null!;
  public DbSet<ProjectUser> ProjectUsers { get; set; } = null!;
  
  public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) :
    base(options)
  {
  }
}