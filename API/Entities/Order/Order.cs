using System;
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
    public string Comment { get; set; }

    public string CreatedBy { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public List<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

    public bool IsClosed { get; set; } = false;
  }
}