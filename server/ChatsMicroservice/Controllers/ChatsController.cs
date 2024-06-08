using Microsoft.AspNetCore.Mvc;

namespace ChatsMicroservice.Controllers;

[Route("/api/v1/")]
[ApiController]
public class ChatsController : ControllerBase
{
  [HttpGet("projects/{projectId}/chats")]
  public ActionResult GetProjectChats()
  {
    return Ok();
  }
  
  [HttpPost("projects/{projectId}/chats")]
  public ActionResult CreateProjectChat()
  {
    return Ok();
  }
  
  [HttpDelete("projects/{projectId}/chats/{chatId}")]
  public ActionResult DeleteChat()
  {
    return Ok();
  }
}