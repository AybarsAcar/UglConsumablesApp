using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Entities.Account;
using API.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Data.Repositories
{
  public class UserRepository : IUserRepository
  {
    private readonly DataContext _context;
    private readonly IMapper _mapper;


    public UserRepository(DataContext context, IMapper mapper)
    {
      _context = context;
      _mapper = mapper;
    }

    public async Task<IEnumerable<AppUser>> GetUsersAsync()
    {
      return await _context.Users.ToListAsync();
    }

    public void Update(AppUser user)
    {
      throw new System.NotImplementedException();
    }

    public async Task<AppUser> GetUserByUsernameAsync(string username)
    {
      return await _context.Users.FirstOrDefaultAsync(x => x.UserName == username);
    }

    public async Task<AppUser> GetUserByEmailAsync(string email)
    {
      return await _context.Users.FirstOrDefaultAsync(x => x.Email == email);
    }

    public async Task<IEnumerable<AppUser>> GetUsersByDepartmentAsync(string department)
    {
      var query = _context.Users.AsQueryable();

      query = query.Where(u => u.Department == department);

      return await query.ToListAsync();
    }
  }
}