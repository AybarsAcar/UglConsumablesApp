using System.Collections.Generic;

namespace API.Entities
{
  public class AreaOfWork
  {
    public int Id { get; set; }
    public int Description { get; set; }
    public int ServiceOrder { get; set; }

    public List<Consumable> ConsumableProducts { get; set; }
  }
}