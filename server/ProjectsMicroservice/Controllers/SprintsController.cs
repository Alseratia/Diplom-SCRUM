using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using ProjectsMicroservice.Controllers.Requests;

namespace ProjectsMicroservice.Controllers;

[Route("/api/v1/projects/{projectName}/sprints")]
[ApiController]
public class SprintsController : ControllerBase
{
  [HttpGet]
  public ActionResult GetProjectSprints([FromHeader] Guid userId, [Required] string projectName)
  {
    return Ok();
  }
  
  [HttpPost]
  public ActionResult CreateProjectSprint([FromHeader] Guid userId, [Required] string projectName, 
    [FromBody] CreateSprintRequest request)
  {
    return Ok();
  }
  
  [HttpDelete("{sprintName}")]
  public ActionResult DeleteSprint([FromHeader] Guid userId, [Required] string projectName, 
    [Required] string sprintName)
  {
    return Ok();
  }
  
  [HttpPost("{sprintName}/start")]
  public ActionResult StartSprint([FromHeader] Guid userId, [Required] string projectName, 
    [Required] string sprintName, [FromBody] StartSprintRequest request)
  {
    return Ok();
  }
}