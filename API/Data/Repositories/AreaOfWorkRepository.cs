using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Data.Repositories
{
  public class AreaOfWorkRepository : IAreaOfWorkRepository
  {
    private readonly DataContext _context;
    private readonly IMapper _mapper;

    public AreaOfWorkRepository(DataContext context, IMapper mapper)
    {
      _context = context;
      _mapper = mapper;
    }

    public async Task<List<AreaOfWork>> GetAreaOfWorksAsync()
    {
      return await _context.AreaOfWorks.ToListAsync();
    }

    public async Task<AreaOfWork> GetAreaOfWorkByServiceOrderAsync(int serviceOrder)
    {
      return await _context.AreaOfWorks.Include(a => a.ConsumableProducts)
        .FirstOrDefaultAsync(x => x.ServiceOrder == serviceOrder);
    }

    public async Task<AreaOfWork> GetAreaOfWorkByIdAsync(int id)
    {
      return await _context.AreaOfWorks.FindAsync(id);
    }

    public async Task CreateAreaOfWorkAsync(AreaOfWork areaOfWork)
    {
      await _context.AreaOfWorks.AddAsync(areaOfWork);
    }
  }
}