using System.Threading.Tasks;
using API.Data.Repositories;
using API.Entities;
using API.Interfaces;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;

namespace API.Data
{
  public class UnitOfWork : IUnitOfWork
  {
    private readonly DataContext _context;
    private readonly IMapper _mapper;

    public UnitOfWork(DataContext context, IMapper mapper)
    {
      _context = context;
      _mapper = mapper;
    }

    public IConsumableRepository ConsumableRepository => new ConsumableRepository(_context, _mapper);
    public IAreaOfWorkRepository AreaOfWorkRepository => new AreaOfWorkRepository(_context, _mapper);
    public IUserRepository UserRepository => new UserRepository(_context, _mapper);

    public async Task<bool> Complete()
    {
      return await _context.SaveChangesAsync() > 0;
    }

    public bool HasChanges()
    {
      return _context.ChangeTracker.HasChanges();
    }
  }
}