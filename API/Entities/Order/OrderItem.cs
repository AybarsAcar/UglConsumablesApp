using Microsoft.EntityFrameworkCore;

namespace API.Entities.Order
{
  /// <summary>
  /// included in the order
  /// this won't have its own table
  /// </summary>
  [Owned]
  public class OrderItem
  {
    public int SapId { get; set; }
    public string Description { get; set; }
    public int Quantity { get; set; }
    public string UnitOfMeasure { get; set; }
    public bool IsPrd { get; set; }
  }
}