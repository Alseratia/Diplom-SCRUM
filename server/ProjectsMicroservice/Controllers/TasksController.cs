using Microsoft.AspNetCore.Mvc;
using ProjectsMicroservice.Controllers.Requests;
using ProjectsMicroservice.Controllers.Responses;
using ProjectsMicroservice.DatabaseContext.Models;
using ProjectsMicroservice.Services;

namespace ProjectsMicroservice.Controllers;

[Route("/api/v1/projects/{projectName}/user-stories/{storyId}/tasks")]
[ApiController]
public class TasksController : ControllerBase
{
  private readonly TasksService _taskService;

  public TasksController(TasksService taskService)
    => _taskService = taskService;
  
  [HttpPost]
  public async Task<ActionResult<TaskResponse>> CreateTask([FromHeader] Guid userId, string projectName, Guid storyId, CreateStoryTaskRequest request)
  {
    return await _taskService.CreateTask(userId, projectName, storyId, request);
  }

  [HttpDelete("{taskId}")]
  public async Task<ActionResult> DeleteTask([FromHeader] Guid userId, string projectName, Guid storyId, Guid taskId)
  {
    return await _taskService.DeleteTask(userId, projectName, storyId, taskId);
  }
}