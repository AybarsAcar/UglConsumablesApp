using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
  public class AreaOfWorkDto
  {
    [Required] public string Description { get; set; }
    [Required] public int ServiceOrder { get; set; }
  }
}