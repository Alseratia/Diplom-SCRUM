using Microsoft.AspNetCore.Mvc;
using ProjectsMicroservice.Controllers.Requests;

namespace ProjectsMicroservice.Controllers;

// [Route("/api/v1/")]
// [ApiController]
// public class EventsController : ControllerBase
// {
//   [HttpGet("projects/{projectId}/events")]
//   public ActionResult GetProjectEvents(Guid projectId, [FromQuery] DateTime? startFrom, [FromQuery] DateTime? startUntil)
//   {
//     return Ok();
//   }
//
//   [HttpGet("users/{userId}/events")]
//   public ActionResult GetUserEvents(Guid userId, [FromQuery] DateTime? startFrom, [FromQuery] DateTime? startUntil)
//   {
//     return Ok();
//   }
//
//   [HttpPost("projects/{projectId}/events")]
//   public ActionResult CreateEvent(Guid projectId, [FromBody] CreateEventRequest request)
//   {
//     return Ok();
//   }
//
//   [HttpDelete("events/{eventId}")]
//   public ActionResult DeleteEvent(Guid eventId)
//   {
//     return Ok();
//   }
// }