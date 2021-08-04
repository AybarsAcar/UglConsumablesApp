using System.Collections.Generic;

namespace API.Entities
{
  public class Consumable
  {
    public int Id { get; set; }
    public int SapId { get; set; }
    public string Description { get; set; }
    public string UnitOfMeasure { get; set; }
    public bool IsSite { get; set; }
  }
}