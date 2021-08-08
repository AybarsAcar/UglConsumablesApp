using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities.Order;
using API.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Data.Repositories
{
  public class OrderRepository : IOrderRepository
  {
    private readonly DataContext _context;
    private readonly IMapper _mapper;

    public OrderRepository(DataContext context, IMapper mapper)
    {
      _context = context;
      _mapper = mapper;
    }

    public async Task<List<Order>> GetOrdersAsync(int? serviceOrderId)
    {
      if (serviceOrderId == null)
      {
        return await _context.Orders.ToListAsync();
      }

      return await _context.Orders.Where(o => o.ServiceOrderId == serviceOrderId).ToListAsync();
    }

    public async Task<Order> GetOrderByIdAsync(int id)
    {
      return await _context.Orders.FindAsync(id);
    }

    public async Task CreateOrderAsync(Order order)
    {
      await _context.AddAsync(order);
    }
  }
}