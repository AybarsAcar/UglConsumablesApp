using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using API.Entities;

namespace API.DTOs
{
  public class CreateConsumableDto
  {
    [Required] public int SapId { get; set; }
    [Required] public string Description { get; set; }
    [Required] public string UnitOfMeasure { get; set; }
    [Required] public bool IsSite { get; set; }
    
    public List<int> ServiceOrderIds { get; set; }
  }
}