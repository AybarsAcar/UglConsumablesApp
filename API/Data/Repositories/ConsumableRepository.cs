using System.Collections.Generic;
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

    public ConsumableRepository(DataContext context, IMapper mapper)
    {
      _context = context;
    }

    public async Task<List<Consumable>> GetConsumablesAsync()
    {
      var query = _context.Consumables.AsQueryable();

      return await query.ToListAsync();
    }

    public async Task<Consumable> GetConsumableBySapIdAsync(int sapId)
    {
      return await _context.Consumables.SingleOrDefaultAsync(x => x.SapId == sapId);
    }

    public async Task CreateConsumableAsync(Consumable consumable)
    {
      await _context.Consumables.AddAsync(consumable);
    }
  }
}