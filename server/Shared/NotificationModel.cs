using System.Text.Json;

namespace Shared;

public class NotificationModel
{
  public string UserId { get; set; } = null!;
  public string Title { get; set; } = null!;
  public string Message { get; set; } = null!;

  public static implicit operator string(NotificationModel model)
  {
    return JsonSerializer.Serialize(model);
  }
  public static implicit operator NotificationModel?(string model)
  {
    return JsonSerializer.Deserialize<NotificationModel>(model);
  }
}