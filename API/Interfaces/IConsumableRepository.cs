using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
  public interface IConsumableRepository
  {
    /// <summary>
    /// 
    /// </summary>
    /// <param name="serviceOrderId">Area of Works service order id</param>
    /// <returns></returns>
    public Task<List<Consumable>> GetConsumablesAsync(int? serviceOrderId);

    public Task<Consumable> GetConsumableBySapIdAsync(int sapId);

    Task CreateConsumableAsync(Consumable consumable);
  }
}