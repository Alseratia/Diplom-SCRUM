using Microsoft.AspNetCore.Mvc;

namespace ProjectsMicroservice.Controllers;

[Route("/api/v1/")]
[ApiController]
public class ProfileController : ControllerBase
{
  // [HttpGet("users/{userId}/user-stories")]
  // public ActionResult<ICollection<UserStoryResponse>> GetUserUserStories(Guid userId)
  // {
  //   return _storiesService.GetUserUserStories(userId);
  // }
}