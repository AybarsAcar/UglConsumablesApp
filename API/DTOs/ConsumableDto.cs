using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
  public class ConsumableDto
  {
    [Required] public int SapId { get; set; }
    [Required] public string Description { get; set; }
    [Required] public string UnitOfMeasure { get; set; }
    [Required] public bool IsSite { get; set; }
  }
}