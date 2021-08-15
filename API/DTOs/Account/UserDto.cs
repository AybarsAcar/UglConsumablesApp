using System.Collections.Generic;
using API.Entities.Account;

namespace API.DTOs.Account
{
  public class UserDto
  {
    public string Username { get; set; }
    public string Email { get; set; }
    public string Token { get; set; }
    public string Department { get; set; }
  }
}