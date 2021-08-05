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
    private readonly UserManager<AppUser> _userManager;
    private readonly SignInManager<AppUser> _signInManager;
    private readonly TokenService _tokenService;
    private readonly IConfiguration _config;

    public UnitOfWork(DataContext context, IMapper mapper, UserManager<AppUser> userManager,
      SignInManager<AppUser> signInManager,
      TokenService tokenService, IConfiguration config)
    {
      _context = context;
      _mapper = mapper;
      _userManager = userManager;
      _signInManager = signInManager;
      _tokenService = tokenService;
      _config = config;
    }

    public IConsumableRepository ConsumableRepository => new ConsumableRepository(_context, _mapper);
    public IAreaOfWorkRepository AreaOfWorkRepository => new AreaOfWorkRepository(_context, _mapper);
    public IUserRepository UserRepository => new UserRepository(_userManager, _signInManager, _tokenService, _config);

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