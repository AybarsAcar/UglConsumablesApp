using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
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

    /// <summary>
    /// creates a consumable
    /// </summary>
    /// <param name="consumableDto">data sent from client to create a consumable</param>
    /// <returns></returns>
    [HttpPost]
    public async Task<IActionResult> CreateConsumable(CreateConsumableDto consumableDto)
    {
      await _unit.ConsumableRepository.CreateConsumableAsync(_mapper.Map<Consumable>(consumableDto));

      if (await _unit.Complete())
      {
        return Ok();
      }

      return BadRequest();
    }

    /// <summary>
    /// returns the list of consumables
    /// if a service order query parameters is passed in, it filters the consumables and lists
    /// them if they include that service order in the areaOfWorks
    /// </summary>
    /// <param name="serviceOrderId"></param>
    /// <returns></returns>
    [HttpGet]
    public async Task<ActionResult<List<Consumable>>> GetConsumables([FromQuery] int? serviceOrderId)
    {
      return Ok(await _unit.ConsumableRepository.GetConsumablesAsync(serviceOrderId));
    }

    [HttpGet("{sapId}")]
    public async Task<ActionResult<Consumable>> GetConsumableBySapId(int sapId)
    {
      return Ok(await _unit.ConsumableRepository.GetConsumableBySapIdAsync(sapId));
    }

    /// <summary>
    /// adds a service order reference to a consumable
    /// TODO: maybe extract this into its own repository method
    /// </summary>
    /// <param name="sapId">sap id of the consumable</param>
    /// <param name="serviceOrderId">service order id of the area of work</param>
    /// <returns></returns>
    [HttpPost("{sapId}/{serviceOrderId}")]
    public async Task<IActionResult> AddToServiceOrder(int sapId, int serviceOrderId)
    {
      var consumable = await _unit.ConsumableRepository.GetConsumableBySapIdAsync(sapId);

      var areaOfWorkToAdd = await _unit.AreaOfWorkRepository.GetAreaOfWorkByServiceOrderAsync(serviceOrderId);

      consumable.AreaOfWorks.Add(areaOfWorkToAdd);

      if (await _unit.Complete()) return Ok();

      return BadRequest("Error adding the consumable");
    }
  }
}