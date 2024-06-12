using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProjectsMicroservice.Controllers.Requests;
using ProjectsMicroservice.Controllers.Responses;
using ProjectsMicroservice.Services;

namespace ProjectsMicroservice.Controllers;

[Route("/api/v1/projects/{projectName}")]
[ApiController]
public class UserStoriesController : ControllerBase
{
  private readonly UserStoriesService _storiesService;
  
  public UserStoriesController(UserStoriesService storiesService)
    => _storiesService = storiesService;

  #region Из проекта

  [HttpGet("user-stories")]
  public ActionResult<ICollection<UserStoryResponse>> GetProjectUserStories([FromHeader] Guid userId, string projectName)
  {
    return _storiesService.GetProjectUserStories(userId, projectName);
  }

  [HttpPost("user-stories")]
  public async Task<ActionResult<UserStoryResponse>> CreateUserStory([FromHeader] Guid userId, string projectName, 
    [FromBody] CreateUserStoryRequest request)
  {
    return await _storiesService.CreateUserStory(userId, projectName, request);
  }
  
  [HttpDelete("user-stories/{userStoryId}")]
  public async Task<ActionResult> DeleteUserStory([FromHeader] Guid userId, string projectName, Guid userStoryId)
  {
    return await _storiesService.DeleteUserStory(userId, projectName, userStoryId);
  }
  
  #endregion
  
  #region Из спринта

  [HttpGet("sprints/{sprintName}/user-stories")]
  public ActionResult<ICollection<UserStoryResponse>> GetSprintUserStories([FromHeader] Guid userId, 
    string projectName, string sprintName)
  {
    return _storiesService.GetSprintUserStories(userId, projectName, sprintName);
  }

  [HttpPost("sprints/{sprintName}/user-stories/{storyId}")]
  public async Task<ActionResult> MoveStoryToSprint([FromHeader] Guid userId, 
    string projectName, string sprintName, Guid storyId)
  {
    return await _storiesService.MoveStoryToSprint(userId, storyId, projectName, sprintName);
  }
  #endregion

  
}