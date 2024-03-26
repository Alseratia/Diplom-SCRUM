using Application.Models;

namespace Application.Repositories;

public interface IUserRepository
{
  public User CreateUser(string email, string password, string name);
  public User? GetById(Guid id);
  public User? GetByEmail(string email);
  
}