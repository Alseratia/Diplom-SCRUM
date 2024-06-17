using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using ProjectsMicroservice.Controllers.Requests;
using ProjectsMicroservice.Controllers.Responses;
using ProjectsMicroservice.Services;

namespace ProjectsMicroservice.Controllers;

[Route("/api/v1/projects/{projectName}/sprints/")]
[ApiController]
public class SprintsController : ControllerBase
{
  private readonly SprintsService _sprintsService;

  public SprintsController(SprintsService sprintsService)
    => _sprintsService = sprintsService;
  
  [HttpGet]
  public ActionResult<ICollection<SprintResponse>> GetProjectSprints([FromHeader] Guid userId, 
    [Required] string projectName)
  {
    return _sprintsService.GetProjectSprints(userId, projectName);
  }
  
  [HttpGet("{sprintName}")]
  public ActionResult<SprintResponse> GetProjectSprint([FromHeader] Guid userId, 
    [Required] string projectName, [Required] string sprintName)
  {
    return _sprintsService.GetProjectSprint(userId, projectName, sprintName);
  }
  
  [HttpPost]
  public async Task<ActionResult<SprintResponse>> CreateProjectSprint([FromHeader] Guid userId, 
    [Required] string projectName, 
    [FromBody] CreateSprintRequest request)
  {
    return await _sprintsService.CreateProjectSprint(userId, projectName, request);
  }
  
  [HttpDelete("{sprintName}")]
  public ActionResult DeleteSprint([FromHeader] Guid userId, [Required] string projectName, 
    [Required] string sprintName)
  {
    return Ok();
  }
  
  [HttpPost("{sprintName}/start")]
  public async Task<ActionResult> StartSprint([FromHeader] Guid userId, [Required] string projectName, 
    [Required] string sprintName, [FromBody] StartSprintRequest request)
  {
    return await _sprintsService.StartSprint(userId, projectName, sprintName, request);
  }
}