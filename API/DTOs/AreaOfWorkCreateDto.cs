using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
  public class AreaOfWorkCreateDto
  {
    [Required] public string Description { get; set; }
    [Required] public int ServiceOrder { get; set; }
  }
}