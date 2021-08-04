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

    public Task<Consumable> GetConsumableBySapIdAsync()
    {
      throw new System.NotImplementedException();
    }

    public void CreateConsumableAsync(Consumable consumable)
    {
      _context.Consumables.Add(consumable);
    }
  }
}