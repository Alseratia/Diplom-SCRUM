using Microsoft.AspNetCore.Mvc;

namespace ProjectsMicroservice.Controllers;

[Route("api/v1/")]
[ApiController]
public class ParticipantsController : ControllerBase
{
  [HttpGet("projects/{projectId}/participants")]
  public ActionResult GetProjectParticipants(string projectId)
  {
    return Ok();
  }
  
  [HttpDelete("participants/{participantId}")]
  public ActionResult DeleteProjectParticipant(string participantId)
  {
    return Ok();
  }
  
}