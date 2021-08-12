using System;
using System.Collections.Generic;
using API.Entities.Order;

namespace API.DTOs
{
  public class OrderDetailDto
  {
    public int Id { get; set; }
    public int ServiceOrderId { get; set; }
    public string AreaOfWorkDescription { get; set; }
    public string Comment { get; set; }

    public string CreatedBy { get; set; }
    public DateTime CreatedAt { get; set; }
    public List<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

    public bool IsClosed { get; set; }
  }
}