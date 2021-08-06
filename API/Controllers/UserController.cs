using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs.Account;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  /// <summary>
  /// used to return user information to other logged in users
  /// </summary>
  [ApiController]
  [Route("/api/[controller]")]
  public class UserController : ControllerBase
  {
    private readonly IUnitOfWork _unit;
    private readonly IMapper _mapper;

    public UserController(IUnitOfWork unit, IMapper mapper)
    {
      _unit = unit;
      _mapper = mapper;
    }

    /// <summary>
    /// returns a list of users to client
    /// </summary>
    /// <returns></returns>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<UserDto>>> GetUsers()
    {
      var users = await _unit.UserRepository.GetUsersAsync();

      return Ok(users);
    }

    /// <summary>
    /// returns a list of users in a department provided in a query string
    /// </summary>
    /// <param name="department"></param>
    /// <returns></returns>
    [HttpGet("/department")]
    public async Task<ActionResult<IEnumerable<UserDto>>> GetUsersByDepartment([FromQuery] string department)
    {
      var users = await _unit.UserRepository.GetUsersByDepartmentAsync(department);

      return Ok(users);
    }

    /// <summary>
    /// returns the user with the given username or BadRequest
    /// </summary>
    /// <param name="username"></param>
    /// <returns></returns>
    [HttpGet("{username}")]
    public async Task<ActionResult<UserDto>> GetUserByUsername(string username)
    {
      var user = await _unit.UserRepository.GetUserByUsernameAsync(username);

      if (user == null)
      {
        return BadRequest("User with the username does not exist");
      }

      return Ok(user);
    }
    
    /// <summary>
    /// returns the user with the given email or BadRequest
    /// </summary>
    /// <param name="username"></param>
    /// <returns></returns>
    [HttpGet("email/{email}")]
    public async Task<ActionResult<UserDto>> GetUserByEmail(string email)
    {
      var user = await _unit.UserRepository.GetUserByEmailAsync(email);

      if (user == null)
      {
        return BadRequest("User with the email does not exist");
      }

      return Ok(user);
    }
  }
}