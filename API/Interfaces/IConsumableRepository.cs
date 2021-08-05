using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
  public interface IConsumableRepository
  {
    public Task<List<Consumable>> GetConsumablesAsync();

    public Task<Consumable> GetConsumableBySapIdAsync(int sapId);

    Task CreateConsumableAsync(Consumable consumable);
  }
}