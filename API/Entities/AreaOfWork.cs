using System.Collections.Generic;

namespace API.Entities
{
  public class AreaOfWork
  {
    public int Id { get; set; }
    public string Description { get; set; }
    public int ServiceOrder { get; set; }

    public List<Consumable> Consumables { get; set; } = new List<Consumable>();
  }
}