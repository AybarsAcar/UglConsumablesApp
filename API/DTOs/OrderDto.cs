using System;

namespace API.DTOs
{
  public class OrderDto
  {
    public int Id { get; set; }
    public int ServiceOrderId { get; set; }
    public string AreaOfWorkDescription { get; set; }
    public string CreatedBy { get; set; }
    public DateTime CreatedAt { get; set; }
  }
}