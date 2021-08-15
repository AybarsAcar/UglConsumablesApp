using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace API.Entities.Account
{
  public class AppRole : IdentityRole<int>
  {
    public ICollection<AppUserRole> UserRoles { get; set; }
  }
}