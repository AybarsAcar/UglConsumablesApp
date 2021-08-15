using System.Threading.Tasks;
using API.DTOs.Account;
using API.Entities.Account;
using API.Interfaces;
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
    private readonly IUserAccessor _userAccessor;

    public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager,
      TokenService tokenService, IUserAccessor userAccessor)
    {
      _userManager = userManager;
      _signInManager = signInManager;
      _tokenService = tokenService;
      _userAccessor = userAccessor;
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
        UserName = registerDto.Username.ToLower(),
        Email = registerDto.Email.ToLower(),
      };

      var result = await _userManager.CreateAsync(user, registerDto.Password);

      // TODO: update to more sophisticated way
      if (user.UserName == "aybarsacar")
      {
        var roleResult = await _userManager.AddToRoleAsync(user, "Admin");

        if (!roleResult.Succeeded) return BadRequest(result.Errors);
      }
      else
      {
        var roleResult = await _userManager.AddToRoleAsync(user, "User");

        if (!roleResult.Succeeded) return BadRequest(result.Errors);
      }

      if (!result.Succeeded)
      {
        return BadRequest("Problem registering the user");
      }

      return new UserDto
      {
        Username = user.UserName,
        Email = user.Email,
        Token = await _tokenService.CreateToken(user),
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
        Token = await _tokenService.CreateToken(user),
        Department = user?.Department
      };
    }

    /// <summary>
    /// returns the user from the token
    /// </summary>
    /// <returns></returns>
    [HttpGet]
    public async Task<ActionResult<UserDto>> GetCurrentUser()
    {
      var username = _userAccessor.GetUsername();

      if (username == null)
      {
        return Unauthorized();
      }

      var user = await _userManager.Users.FirstOrDefaultAsync(x => x.UserName == username);

      return new UserDto
      {
        Username = user.UserName,
        Email = user.Email,
        Token = await _tokenService.CreateToken(user),
        Department = user?.Department
      };
    }
  }
}