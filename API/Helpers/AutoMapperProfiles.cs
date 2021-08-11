using API.DTOs;
using API.Entities;
using API.Entities.Order;
using AutoMapper;

namespace API.Helpers
{
  public class AutoMapperProfiles : Profile
  {
    public AutoMapperProfiles()
    {
      // from -> to
      CreateMap<ConsumableCreateDto, Consumable>();

      CreateMap<Consumable, ConsumableDto>();
      
      CreateMap<AreaOfWork, AreaOfWorkDto>();

      CreateMap<Order, OrderDto>();
      CreateMap<Order, OrderDetailDto>();
    }
  }
}