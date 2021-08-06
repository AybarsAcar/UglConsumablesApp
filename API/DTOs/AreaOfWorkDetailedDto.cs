using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using API.Entities;

namespace API.DTOs
{
  public class AreaOfWorkDetailedDto
  {
    [Required] public string Description { get; set; }
    [Required] public int ServiceOrder { get; set; }

    public List<Consumable> ConsumableProducts { get; set; } = new List<Consumable>();
  }
}