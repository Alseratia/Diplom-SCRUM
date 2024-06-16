using Microsoft.AspNetCore.Mvc;
using ProjectsMicroservice.Controllers.Requests;
using ProjectsMicroservice.Controllers.Responses;
using ProjectsMicroservice.Services;

namespace ProjectsMicroservice.Controllers;

[Route("api/v1/projects")]
[ApiController]
public class ProjectsController : ControllerBase
{
  private readonly ProjectsService _projectsService;
  
  public ProjectsController(ProjectsService projectService)
    => _projectsService = projectService;
  
  [HttpGet]
  public ActionResult<ICollection<UserProjectResponse>> GetAllUserProjects([FromHeader] Guid userId)
  {
    return _projectsService.GetAllUserProjects(userId);
  }
  
  [HttpGet("{projectName}")]
  public async Task<ActionResult<UserProjectResponse>> GetAllUserProject([FromHeader] Guid userId, string projectName)
  {
    return await _projectsService.GetUserProject(userId, projectName);
  }
  
  [HttpPost]
  public async Task<ActionResult<UserProjectResponse>> CreateProject([FromHeader] Guid userId, [FromBody] CreateProjectRequest request)
  {
    return await _projectsService.CreateProject(userId, request);
  }
  
  [HttpDelete("{projectName}")]
  public async Task<ActionResult> DeleteProject([FromHeader] Guid userId, string projectName)
  {
    return await _projectsService.DeleteProject(userId, projectName);
  }
}

