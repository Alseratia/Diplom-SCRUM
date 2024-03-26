using AuthMicroservice.DataAccess.Models;
using AutoMapper;

namespace AuthMicroservice.DataAccess;

public class MapperProfile : Profile
{
  public MapperProfile()
  {
    CreateMap<User, Application.Models.User>().ReverseMap();
    CreateMap<Tokens, Application.Models.Tokens>().ReverseMap();
  }
}