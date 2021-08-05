using System.Security.Claims;
using API.Interfaces;
using Microsoft.AspNetCore.Http;

namespace API.Security
{
  /// <summary>
  /// returns the username from the JWT token
  /// </summary>
  public class UserAccessor : IUserAccessor
  {
    private readonly IHttpContextAccessor _httpContextAccessor;

    /// <summary>
    /// inject the IHttpContextAccessor to grab the user claims from the user token
    /// </summary>
    public UserAccessor(IHttpContextAccessor httpContextAccessor)
    {
      _httpContextAccessor = httpContextAccessor;
    }

    public string GetUsername()
    {
      return _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.Name);
    }
  }
}