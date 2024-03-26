using Application.Models;
using Application.Repositories;
using AutoMapper;

namespace AuthMicroservice.DataAccess.Repositories;

public class TokensRepository : ITokenRepository
{
  private readonly IMapper _mapper;
  private readonly ApplicationDbContext _dbContext;
  public TokensRepository(ApplicationDbContext dbContext, IMapper mapper) 
    => (_dbContext, _mapper) = (dbContext, mapper);

  public Tokens NewTokens(Guid userId)
  {
    var dbUser = _dbContext.Users.Find(userId);

    if (dbUser == null) throw new Exception("User not found");

    var newTokens = new Tokens();
    
    dbUser.Tokens = _mapper.Map<Models.Tokens>(newTokens);
    dbUser.TokensId = newTokens.Id;
    _dbContext.SaveChanges();
    
    return newTokens;
  }
}