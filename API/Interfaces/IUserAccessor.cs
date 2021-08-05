namespace API.Interfaces
{
  /// <summary>
  /// Gets teh user name from the JWT token
  /// </summary>
  public interface IUserAccessor
  {
    public string GetUsername();
  }
}