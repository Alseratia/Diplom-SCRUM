using Microsoft.AspNetCore.Mvc;
using ProjectsMicroservice.Controllers.Requests;

namespace ProjectsMicroservice.Controllers;

[Route("/api/v1/")]
[ApiController]
public class EventsController : ControllerBase
{
  [HttpGet("projects/{projectId}/events")]
  public ActionResult GetProjectEvents(string projectId, [FromQuery] DateTime? startFrom, [FromQuery] DateTime? startUntil)
  {
    return Ok();
  }

  [HttpGet("users/{userId}/events")]
  public ActionResult GetUserEvents(string userId, [FromQuery] DateTime? startFrom, [FromQuery] DateTime? startUntil)
  {
    return Ok();
  }

  [HttpPost("projects/{projectId}/events")]
  public ActionResult CreateEvent(string projectId, [FromBody] CreateEventRequest request)
  {
    return Ok();
  }

  [HttpDelete("events/{eventId}")]
  public ActionResult DeleteEvent(string eventId)
  {
    return Ok();
  }
}