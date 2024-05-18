using Microsoft.AspNetCore.Mvc;

namespace AuthMicroservice;

public partial class UseCases
{
  public async Task<ActionResult> Authorize(string accessToken)
  {
    return null;
  }
}