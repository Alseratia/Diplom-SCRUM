using Application.DTO;
using Application.Models;

namespace Application.UseCases;


public partial class UseCases
{
  public NewTokensDto NewTokens(string email, string password)
  {
    var user = UserRepository.GetByEmail(email);
    if (user == null) return null;
    var newTokens = TokenRepository.NewTokens(user.Id);
    return new NewTokensDto()
    {
      AccessToken = newTokens.AccessToken,
      RefreshToken = newTokens.RefreshToken,
      ExpiresAt = newTokens.ExpiresAt
    };
  }
}