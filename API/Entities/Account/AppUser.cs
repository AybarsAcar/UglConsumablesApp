using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace API.Entities.Account
{
  public class AppUser : IdentityUser<int>
  {
    public string Department { get; set; }

    public ICollection<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();

    // TODO: Set the roles
    public ICollection<AppUserRole> UserRoles { get; set; } = new List<AppUserRole>();
  }
}