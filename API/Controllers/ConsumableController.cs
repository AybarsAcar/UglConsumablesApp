using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
  [ApiController]
  [Route("/api/[controller]")]
  public class ConsumableController : ControllerBase
  {
    private readonly IUnitOfWork _unit;
    private readonly IMapper _mapper;

    public ConsumableController(IUnitOfWork unit, IMapper mapper)
    {
      _unit = unit;
      _mapper = mapper;
    }

    [HttpPost]
    public async Task<IActionResult> CreateConsumable(Consumable consumable)
    {
      _unit.ConsumableRepository.CreateConsumableAsync(consumable);

      if (await _unit.Complete())
      {
        return Ok();
      }

      // TODO: currently we are sending BadRequest even though we add it to our db
      return BadRequest();
    }

    [HttpGet]
    public async Task<List<Consumable>> GetConsumables()
    {
      return await _unit.ConsumableRepository.GetConsumablesAsync();
    }
  }
}