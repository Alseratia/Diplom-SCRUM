using ChatsMicroservice.DatabaseContext;
using ChatsMicroservice.DatabaseContext.Models;
using Microsoft.AspNetCore.Mvc;

namespace ChatsMicroservice.Controllers;

[Route("/api/v1/chats/")]
[ApiController]
public class ChatsController : ControllerBase
{
  private readonly ApplicationDbContext _db;
  public ChatsController(ApplicationDbContext db) => _db = db;
  
  [HttpGet("{chatId}")]
  public ActionResult GetChatMessages([FromHeader] Guid userId, Guid chatId,
    [FromQuery] int page, [FromQuery] int pageSize)
  {
    var messages = _db.Messages.Where(x => x.ChatId == chatId)
      .Skip((page - 1) * pageSize)
      .Take(pageSize)
      .OrderBy(x => x.CreatedAt);
    
    return new OkObjectResult(messages);
  }
  
  [HttpGet]
  public ActionResult<ICollection<Chat>> GetProjectChats([FromHeader] Guid userId, [FromQuery] Guid projectId)
  {
    var chats = _db.Chats.Where(x => x.ProjectId == projectId);
    return new OkObjectResult(chats);
  }
  
  [HttpPost]
  public async Task<ActionResult<Chat>> CreateProjectChat([FromHeader] Guid userId, [FromQuery] Guid projectId, 
    string chatName, string? chatAvatar)
  {
    var newChat = new Chat()
    {
      Id = Guid.NewGuid(), 
      Name = chatName, 
      Avatar = chatAvatar, 
      ProjectId = projectId
    };
    _db.Chats.Add(newChat);
    await _db.SaveChangesAsync();

    return new CreatedResult($"/chats/{newChat.Id}", newChat);
  }
}