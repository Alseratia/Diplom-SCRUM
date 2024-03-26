using Application.Models;

namespace Application.Repositories;

public interface ITokenRepository
{
  public Tokens NewTokens(Guid userId);
}