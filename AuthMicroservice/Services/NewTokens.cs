using AuthMicroservice.DTO;
using Microsoft.AspNetCore.Mvc;

namespace AuthMicroservice;


public partial class UseCases
{
  public async Task<ActionResult<NewTokensDto>> NewTokens(string email, string password)
  {
    var user = await _db.GetByEmail(email);
    if (user == null) return null;
    
    var newTokens = await _db.NewTokens(user.Id);
    return new NewTokensDto()
    {
      AccessToken = newTokens.AccessToken,
      RefreshToken = newTokens.RefreshToken,
      ExpiresAt = newTokens.ExpiresAt
    };
  }
}