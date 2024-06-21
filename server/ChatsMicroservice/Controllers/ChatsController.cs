using ChatsMicroservice.DatabaseContext;
using ChatsMicroservice.DatabaseContext.Models;
using Microsoft.AspNetCore.Mvc;

namespace ChatsMicroservice.Controllers;

[Route("/api/v1/")]
[ApiController]
public class ChatsController : ControllerBase
{
  private readonly ApplicationDbContext _db;
  public ChatsController(ApplicationDbContext db) => _db = db;
  
  [HttpGet("projects/{projectId}/chats/{chatName}")]
  public ActionResult GetChatMessages([FromHeader] Guid userId, Guid projectId, string chatId,
    int? page, int? countPerPage)
  {
    return Ok();
  }
  
  [HttpPost("projects/{projectId}/chats")]
  public async Task<ActionResult> CreateProjectChat([FromHeader] Guid userId, Guid projectId, 
    string chatName, string? avatar)
  {
    var newChat = new Chat()
    {
      Id = Guid.NewGuid(), 
      Name = chatName, 
      Avatar = avatar, 
      ProjectId = projectId
    };
    _db.Chats.Add(newChat);
    await _db.SaveChangesAsync();

    return Ok();
  }
  
  [HttpDelete("projects/{projectId}/chats/{chatId}")]
  public ActionResult DeleteChat()
  {
    return Ok();
  }
}