using System.Threading.Tasks;
using API.DTOs.Account;
using API.Entities;
using API.Interfaces;
using API.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace API.Data.Repositories
{
  public class UserRepository : IUserRepository
  {
    private readonly UserManager<AppUser> _userManager;
    private readonly SignInManager<AppUser> _signInManager;
    private readonly TokenService _tokenService;
    private readonly IConfiguration _configuration;

    public UserRepository(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager,
      TokenService tokenService, IConfiguration configuration)
    {
      _userManager = userManager;
      _signInManager = signInManager;
      _tokenService = tokenService;
      _configuration = configuration;
    }

    public async Task<UserDto> Login(LoginDto loginDto)
    {
      // TODO: finish implementing
      var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Email == loginDto.Email);

      if (user == null)
      {
      }

      return new UserDto();
    }

    public Task<UserDto> Register(RegisterDto registerDto)
    {
      throw new System.NotImplementedException();
    }

    public Task<UserDto> GetCurrentUser()
    {
      throw new System.NotImplementedException();
    }

    public Task<UserDto> RefreshToken()
    {
      throw new System.NotImplementedException();
    }
  }
}