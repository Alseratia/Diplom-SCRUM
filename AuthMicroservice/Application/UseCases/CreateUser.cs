using Application.DTO;
using Application.Repositories;

namespace Application.UseCases;

public partial class UseCases
{
  private IUserRepository UserRepository { get; set; }
  private ITokenRepository TokenRepository { get; set; }
  public UseCases(IUserRepository userRepository, ITokenRepository tokenRepository)
    => (UserRepository, TokenRepository) = (userRepository, tokenRepository);
  
  public CreateUserDto CreateUser(string email, string password, string name)
  {
    // если юзер уже существует, то вернуть 409(Конфликт)
    if (UserRepository.GetByEmail(email) != null) return null;
    
    // вернуть 201(Создан)
    var newUser = UserRepository.CreateUser(email, password, name);
    return new CreateUserDto() { Id = newUser.Id };
  }
}