using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  [ApiController]
  [Route("/api/[controller]")]
  public class AreaOfWorkController : ControllerBase
  {
    private readonly IUnitOfWork _unit;
    private readonly IMapper _mapper;

    public AreaOfWorkController(IUnitOfWork unit, IMapper mapper)
    {
      _unit = unit;
      _mapper = mapper;
    }

    /// <summary>
    /// to create an area of work
    /// </summary>
    /// <param name="areaOfWork">passed in the body</param>
    /// <returns></returns>
    [HttpPost]
    public async Task<IActionResult> CreateAreaOfWork(AreaOfWork areaOfWork)
    {
      await _unit.AreaOfWorkRepository.CreateAreaOfWorkAsync(areaOfWork);

      if (await _unit.Complete()) return Ok();

      return BadRequest("Error Creating area of work");
    }

    /// <summary>
    /// returns a list of area of works with Consumables included
    /// </summary>
    /// <returns></returns>
    [HttpGet]
    public async Task<ActionResult<List<AreaOfWorkDto>>> GetAreaOfWorks()
    {
      return Ok(_mapper.Map<List<AreaOfWorkDto>>(await _unit.AreaOfWorkRepository.GetAreaOfWorksAsync()));
    }

    /// <summary>
    /// returns the area of work by its associated service order number
    /// with the consumables included
    /// </summary>
    /// <param name="serviceOrderId"></param>
    /// <returns></returns>
    [HttpGet("{serviceOrderId}")]
    public async Task<AreaOfWork> GetAreaOfWorkByServiceOrderId(int serviceOrderId)
    {
      return await _unit.AreaOfWorkRepository.GetAreaOfWorkByServiceOrderAsync(serviceOrderId);
    }
  }
}