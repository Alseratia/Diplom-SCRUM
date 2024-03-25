namespace Domain;

public class Account
{
  public Guid Id { get; set; }
  public string Login { get; set; } = null!;
  public string PasswordHash { get; set; } = null!;
}