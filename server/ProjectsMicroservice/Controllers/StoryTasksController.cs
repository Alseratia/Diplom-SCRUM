using Microsoft.AspNetCore.Mvc;
using ProjectsMicroservice.Controllers.Requests;
using ProjectsMicroservice.Services;

namespace ProjectsMicroservice.Controllers;

[Route("/api/v1/projects/{projectName}/user-stories/{storyId}/tasks")]
[ApiController]
public class StoryTasksController : ControllerBase
{
  private readonly TasksService _taskService;

  public StoryTasksController(TasksService taskService)
    => _taskService = taskService;
  
  [HttpPost]
  public async Task<ActionResult> CreateTask(string projectName, Guid storyId, CreateStoryTaskRequest request)
  {
    return Ok();
    //return await _taskService.CreateTask(userStoryId, request);
  }

  [HttpDelete("{taskId}")]
  public async Task<ActionResult> DeleteTask(string projectName, Guid storyId, Guid taskId)
  {
    return Ok();
    //return await _taskService.DeleteTask(taskId);
  }
}