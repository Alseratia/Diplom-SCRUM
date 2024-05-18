using AuthMicroservice.DataAccess;

namespace AuthMicroservice;

public class UserService
{
  private readonly ApplicationDbContext _db;
  public UserService(ApplicationDbContext db) => _db = db;
  
  
}