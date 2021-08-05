using System.Threading.Tasks;
using API.DTOs.Account;

namespace API.Interfaces
{
  public interface IUserRepository
  {
    public Task<UserDto> Login(LoginDto loginDto);

    public Task<UserDto> Register(RegisterDto registerDto);

    /// <summary>
    /// returns the user from teh token
    /// </summary>
    /// <returns></returns>
    public Task<UserDto> GetCurrentUser();

    /// <summary>
    /// refreshes the user token if logged in
    /// and returns their account
    /// </summary>
    /// <returns></returns>
    public Task<UserDto> RefreshToken();
  }
}