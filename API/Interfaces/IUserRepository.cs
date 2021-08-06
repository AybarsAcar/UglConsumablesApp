using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
  public interface IUserRepository
  {
    /// <summary>
    /// returns all the users
    /// </summary>
    /// <returns></returns>
    public Task<IEnumerable<AppUser>> GetUsersAsync();

    /// <summary>
    /// updates user details i.e department
    /// </summary>
    /// <param name="user"></param>
    public void Update(AppUser user);

    /// <summary>
    /// finds and returns the user with their username
    /// </summary>
    /// <returns></returns>
    public Task<AppUser> GetUserByUsernameAsync(string username);
    
    /// <summary>
    /// finds and returns the user with their email
    /// </summary>
    /// <returns></returns>
    public Task<AppUser> GetUserByEmailAsync(string email);

    /// <summary>
    /// returns all the users in a given department
    /// </summary>
    /// <param name="department"></param>
    /// <returns></returns>
    public Task<IEnumerable<AppUser>> GetUsersByDepartmentAsync(string department);
  }
}