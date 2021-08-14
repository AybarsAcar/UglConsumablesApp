using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
  public class ConsumableCreateDto
  {
    [Required] public int SapId { get; set; }
    [Required] public string Description { get; set; }
    [Required] public string UnitOfMeasure { get; set; }
    [Required] public bool IsPrd { get; set; }
    
    public List<int> ServiceOrderIds { get; set; }
  }
}