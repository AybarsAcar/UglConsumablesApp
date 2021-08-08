using System.Collections.Generic;

namespace API.Entities.Order
{
  /// <summary>
  /// has its own table
  /// </summary>
  public class Order
  {
    public int Id { get; set; }
    public int ServiceOrderId { get; set; }
    public string AreaOfWorkDescription { get; set; }
    public List<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
  }
}