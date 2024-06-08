using Microsoft.AspNetCore.Mvc;
using ProjectsMicroservice.Controllers.Requests;
using ProjectsMicroservice.Controllers.Responses;
using ProjectsMicroservice.Services;

namespace ProjectsMicroservice.Controllers;

[Route("api/v1/")]
[ApiController]
public class ProjectsController : ControllerBase
{
  private readonly ProjectsService _projectsService;
  
  public ProjectsController(ProjectsService projectService)
    => _projectsService = projectService;
  
  [HttpGet("users/{userId}/projects")]
  public ActionResult<ICollection<UserProjectResponse>> GetUserProjects(Guid userId)
  {
    return _projectsService.GetUserProjects(userId);
  }

  [HttpPost("users/{userId}/projects")]
  public async Task<ActionResult> CreateProject(Guid userId, [FromBody] CreateProjectRequest request)
  {
    return await _projectsService.CreateProject(userId, request);
  }
  
  [HttpDelete("users/{userId}/projects/{projectId}")]
  public async Task<ActionResult> DeleteProject(Guid userId, Guid projectId)
  {
    return await _projectsService.DeleteProject(userId, projectId);
  }
}