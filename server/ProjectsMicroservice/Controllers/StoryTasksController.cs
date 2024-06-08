using Microsoft.AspNetCore.Mvc;
using ProjectsMicroservice.Controllers.Requests;
using ProjectsMicroservice.Services;

namespace ProjectsMicroservice.Controllers;

[Route("/api/v1/")]
[ApiController]
public class StoryTasksController : ControllerBase
{
  private readonly TasksService _taskService;

  public StoryTasksController(TasksService taskService)
    => _taskService = taskService;
  
  [HttpPost("user-stories/{userStoryId}/tasks")]
  public async Task<ActionResult> CreateTask(Guid userStoryId, CreateStoryTaskRequest request)
  {
    return await _taskService.CreateTask(userStoryId, request);
  }

  [HttpDelete("tasks/{taskId}")]
  public async Task<ActionResult> DeleteTask(Guid taskId)
  {
    return await _taskService.DeleteTask(taskId);
  }
}