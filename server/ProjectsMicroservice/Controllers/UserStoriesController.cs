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
    return _storiesService.GetProjectUserStories(projectName);
  }

  [HttpPost("user-stories")]
  public async Task<ActionResult> CreateUserStory([FromHeader] Guid userId, string projectName, [FromBody] CreateUserStoryRequest request)
  {
    return await _storiesService.CreateUserStory(userId, projectName, request);
  }
  
  // TODO 
  [HttpPost("user-stories/{userStoryId}")]
  public async Task<ActionResult> MoveUserStory(Guid userStoryId, [FromQuery] string sprintName)
  {
    return Ok();
    //return await _storiesService.MoveStoryToSprint(userStoryId, sprintName);
  }
  
  [HttpDelete("user-stories/{userStoryId}")]
  public async Task<ActionResult> DeleteUserStory(string projectName, Guid userStoryId)
  {
    return await _storiesService.DeleteUserStory(projectName, userStoryId);
  }
  
  #endregion
  
  #region Из спринта

  [HttpGet("sprints/{sprintName}/user-stories")]
  public ActionResult<ICollection<UserStoryResponse>> GetSprintUserStories(string sprintName)
  {
    return Ok();
    //return _storiesService.GetSprintUserStories(sprintName);
  }

  #endregion

  
}