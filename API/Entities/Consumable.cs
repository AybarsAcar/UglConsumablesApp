using System.Collections.Generic;

namespace API.Entities
{
  public class Consumable
  {
    public int Id { get; set; }
    public int SapId { get; set; }
    public string Description { get; set; }
    public string UnitOfMeasure { get; set; }
    public bool IsPrd { get; set; }
    
    // the order quantity - this application doesn't store stock amount
    public int Quantity { get; set; }
    
    public List<AreaOfWork> AreaOfWorks { get; set; } = new List<AreaOfWork>();
  }
}