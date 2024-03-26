using Application.Models;
using Application.Repositories;
using Application.Utils;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace AuthMicroservice.DataAccess.Repositories;

public class UserRepository : IUserRepository
{
  private readonly IMapper _mapper;
  private readonly ApplicationDbContext _dbContext;
  public UserRepository(ApplicationDbContext dbContext, IMapper mapper) 
    => (_dbContext, _mapper) = (dbContext, mapper);
  
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
    _dbContext.Users.Add(user);
    _dbContext.SaveChanges();
    return _mapper.Map<User>(user);
  }

  public User? GetById(Guid id)
  {
    var user = _dbContext.Users.Find(id);
    return user is null ? null : _mapper.Map<User>(user);
  }

  public User? GetByEmail(string email)
  {
    var user = _dbContext.Users.Include(x => x.Tokens)
                               .FirstOrDefault(x => x.Email == email);
    return user is null ? null : _mapper.Map<User>(user);
  }
}