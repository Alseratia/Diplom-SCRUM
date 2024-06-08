using Microsoft.AspNetCore.Mvc;
using ProjectsMicroservice.Controllers.Requests;
using ProjectsMicroservice.Controllers.Responses;
using ProjectsMicroservice.Services;

namespace ProjectsMicroservice.Controllers;

[Route("/api/v1/")]
[ApiController]
public class UserStoriesController : ControllerBase
{
  private readonly UserStoriesService _storiesService;
  
  public UserStoriesController(UserStoriesService storiesService)
    => _storiesService = storiesService;
  
  [HttpGet("projects/{projectId}/user-stories")]
  public ActionResult<ICollection<UserStoryResponse>> GetProjectUserStories(Guid projectId)
  {
    return _storiesService.GetProjectUserStories(projectId);
  }
  
  [HttpGet("sprints/{sprintsId}/user-stories")]
  public ActionResult<ICollection<UserStoryResponse>> GetSprintUserStories(Guid sprintsId)
  {
    return _storiesService.GetSprintUserStories(sprintsId);
  }
  
  [HttpGet("users/{userId}/user-stories")]
  public ActionResult<ICollection<UserStoryResponse>> GetUserUserStories(Guid userId)
  {
    return _storiesService.GetUserUserStories(userId);
  }
  
  [HttpPost("projects/{projectId}/user-stories")]
  public async Task<ActionResult> CreateUserStory(Guid projectId, [FromBody] CreateUserStoryRequest request)
  {
    return await _storiesService.CreateUserStory(projectId, request);
  }
  
  [HttpPost("user-stories/{userStoryId}")]
  public async Task<ActionResult> MoveUserStory(Guid userStoryId, [FromQuery] Guid sprintId)
  {
    return await _storiesService.MoveStoryToSprint(userStoryId, sprintId);
  }
  
  [HttpDelete("user-stories/{userStoryId}")]
  public async Task<ActionResult> DeleteUserStory(Guid userStoryId)
  {
    return await _storiesService.DeleteUserStory(userStoryId);
  }
}