using System.Security.Claims;
using System.Threading.Tasks;
using API.DTOs.Account;
using API.Entities;
using API.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
  /// <summary>
  /// Controller that handles user authentication and authorisation
  /// </summary>
  [ApiController]
  [Route("/api/[controller]")]
  public class AccountController : ControllerBase
  {
    private readonly UserManager<AppUser> _userManager;
    private readonly SignInManager<AppUser> _signInManager;
    private readonly TokenService _tokenService;

    public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager,
      TokenService tokenService)
    {
      _userManager = userManager;
      _signInManager = signInManager;
      _tokenService = tokenService;
    }

    /// <summary>
    /// tp register a new user
    /// </summary>
    /// <param name="registerDto"></param>
    /// <returns></returns>
    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {
      if (await _userManager.Users.AnyAsync(x => x.Email == registerDto.Email))
      {
        ModelState.AddModelError("email", "Email is already taken");
        return ValidationProblem(ModelState);
      }

      if (await _userManager.Users.AnyAsync(x => x.UserName == registerDto.Username))
      {
        ModelState.AddModelError("username", "Username is already taken");
        return ValidationProblem(ModelState);
      }

      var user = new AppUser
      {
        UserName = registerDto.Username,
        Email = registerDto.Email,
      };

      var result = await _userManager.CreateAsync(user, registerDto.Password);

      if (!result.Succeeded)
      {
        return BadRequest("Problem registering the user");
      }

      return new UserDto
      {
        Username = user.UserName,
        Email = user.Email,
        Token = _tokenService.CreateToken(user),
        Department = user?.Department
      };
    }

    /// <summary>
    /// to login
    /// </summary>
    /// <param name="loginDto"></param>
    /// <returns></returns>
    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
      var user = await _userManager.Users.SingleOrDefaultAsync(x => x.Email == loginDto.Email);

      if (user == null)
      {
        return Unauthorized("Invalid credentials");
      }

      // sign in manager to sign in the user
      var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

      if (!result.Succeeded)
      {
        // wrong password
        return Unauthorized("Invalid credentials");
      }

      return new UserDto
      {
        Username = user.UserName,
        Email = user.Email,
        Token = _tokenService.CreateToken(user),
        Department = user?.Department
      };
    }

    /// <summary>
    /// returns the user from the token
    /// </summary>
    /// <returns></returns>
    [HttpGet]
    public async Task<UserDto> GetCurrentUser()
    {
      var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));

      return new UserDto
      {
        Username = user.UserName,
        Email = user.Email,
        Token = _tokenService.CreateToken(user),
        Department = user?.Department
      };
    }
  }
}