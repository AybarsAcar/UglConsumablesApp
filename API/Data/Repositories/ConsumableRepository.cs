using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Data.Repositories
{
  public class ConsumableRepository : IConsumableRepository
  {
    private readonly DataContext _context;
    private readonly IMapper _mapper;

    public ConsumableRepository(DataContext context, IMapper mapper)
    {
      _context = context;
      _mapper = mapper;
    }

    public async Task<List<Consumable>> GetConsumablesAsync(int? serviceOrderId)
    {
      if (serviceOrderId == null)
      {
        return await _context.Consumables.ToListAsync();
      }

      var query = _context.Consumables.AsQueryable();

      return await query.Where(x => x.AreaOfWorks.Any(a => a.ServiceOrder == serviceOrderId)).ToListAsync();
    }

    public async Task<Consumable> GetConsumableBySapIdAsync(int sapId)
    {
      return await _context.Consumables
        .Include(c => c.AreaOfWorks)
        .SingleOrDefaultAsync(x => x.SapId == sapId);
    }

    public async Task CreateConsumableAsync(Consumable consumable)
    {
      await _context.Consumables.AddAsync(consumable);
    }
  }
}