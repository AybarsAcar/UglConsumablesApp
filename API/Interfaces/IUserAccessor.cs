namespace API.Interfaces
{
  /// <summary>
  /// Gets information of the currently logged in user
  /// from the JWT token sent with the HTTP Request
  /// </summary>
  public interface IUserAccessor
  {
    /// <summary>
    /// returns the username of the currently logged in user
    /// from the JWT token sent with the HTTP Request
    /// </summary>
    /// <returns></returns>
    public string GetUsername();

    /// <summary>
    /// returns the role of the currently logged in user
    /// </summary>
    /// <returns></returns>
    public string GetUserRole();
  }
}