using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
  public interface IConsumableRepository
  {
    /// <summary>
    /// returns the list of consumables
    /// if a service order id is passed a filtered consumable item list is sent to the client that
    /// exists in the serviceOrder that its id is passed in 
    /// </summary>
    /// <param name="serviceOrderId">Area of Works service order id</param>
    /// <returns></returns>
    public Task<List<Consumable>> GetConsumablesAsync(int? serviceOrderId);

    public Task<Consumable> GetConsumableBySapIdAsync(int sapId);

    Task CreateConsumableAsync(Consumable consumable);
  }
}