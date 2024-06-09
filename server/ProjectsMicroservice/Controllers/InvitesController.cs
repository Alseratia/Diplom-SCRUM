using Microsoft.AspNetCore.Mvc;
using ProjectsMicroservice.Controllers.Requests;

namespace ProjectsMicroservice.Controllers;

// [Route("api/v1/")]
// [ApiController]
// public class InvitesController : ControllerBase
// {
//   [HttpGet("projects/{projectId}/invites")]
//   public ActionResult GetProjectInvites(Guid projectId)
//   {
//     return Ok();
//   }
//   
//   [HttpGet("users/{userId}/invites")]
//   public ActionResult GetUsersInvites(Guid userId)
//   {
//     return Ok();
//   }
//   
//   [HttpPost("projects/{projectId}/invite")]
//   public ActionResult CreateProjectInvite(Guid projectId, [FromBody] CreateInviteRequest request)
//   {
//     return Ok();
//   }
//   
//   // [HttpGet("invites/{inviteId}")]
//   // public ActionResult AcceptUserInvite(string inviteId)
//   // {
//   //   return Ok();
//   // }
//   
//   [HttpDelete("invites/{inviteId}")]
//   public IActionResult RevokeProjectInvite(Guid inviteId)
//   {
//     return Ok();
//   }
// }