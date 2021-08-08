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
    /// TODO
    /// </summary>
    /// <param name="dto">data sent from client to create a consumable</param>
    /// <returns></returns>
    [HttpPost]
    public async Task<IActionResult> CreateConsumable(ConsumableCreateDto dto)
    {
      var consumable = new Consumable
      {
        SapId = dto.SapId,
        Description = dto.Description,
        UnitOfMeasure = dto.UnitOfMeasure,
        IsSite = dto.IsSite,
        Quantity = 0,
        AreaOfWorks = new List<AreaOfWork>()
      };

      await _unit.ConsumableRepository.CreateConsumableAsync(consumable);

      if (dto.ServiceOrderIds.Count > 0)
      {
        foreach (var serviceOrderId in dto.ServiceOrderIds)
        {
          var areaOfWorkToAdd = await _unit.AreaOfWorkRepository.GetAreaOfWorkByServiceOrderAsync(serviceOrderId);

          consumable.AreaOfWorks.Add(areaOfWorkToAdd);
        }
      }

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
    public async Task<ActionResult<List<ConsumableDto>>> GetConsumables([FromQuery] int? serviceOrderId)
    {
      return Ok(_mapper.Map<List<ConsumableDto>>(await _unit.ConsumableRepository.GetConsumablesAsync(serviceOrderId)));
    }

    [HttpGet("{sapId}")]
    public async Task<ActionResult<ConsumableDto>> GetConsumableBySapId(int sapId)
    {
      return Ok(_mapper.Map<ConsumableDto>(await _unit.ConsumableRepository.GetConsumableBySapIdAsync(sapId)));
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