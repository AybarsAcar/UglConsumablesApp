using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
  /// <summary>
  /// interacts with the area of works 
  /// </summary>
  public interface IAreaOfWorkRepository
  {
    public Task<List<AreaOfWork>> GetAreaOfWorksAsync();

    public Task<AreaOfWork> GetAreaOfWorkByIdAsync(int id);

    public Task<AreaOfWork> GetAreaOfWorkByServiceOrderAsync(int serviceOrder);

    public Task CreateAreaOfWorkAsync(AreaOfWork areaOfWork);
  }
}