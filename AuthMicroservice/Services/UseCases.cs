using AuthMicroservice.DataAccess;

namespace AuthMicroservice;

public partial class UseCases
{
  private readonly ApplicationDbContext _db;
  public UseCases(ApplicationDbContext db) => _db = db;
  
}