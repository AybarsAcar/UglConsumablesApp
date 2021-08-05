using System.Threading.Tasks;

namespace API.Interfaces
{
  /// <summary>
  /// Centralised Repository
  /// Used for more performant queries
  /// </summary>
  public interface IUnitOfWork
  {
    IConsumableRepository ConsumableRepository { get; }
    IAreaOfWorkRepository AreaOfWorkRepository { get; }
    IUserRepository UserRepository { get; }

    /// <summary>
    /// to save all the changes to database
    /// </summary>
    /// <returns></returns>
    Task<bool> Complete();

    /// <summary>
    /// to see if the EF has been tracking or has any changes
    /// </summary>
    /// <returns></returns>
    bool HasChanges();
  }
}