using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities.Order;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  [ApiController]
  [Route("/api/[controller]")]
  public class OrderController : ControllerBase
  {
    private readonly IUnitOfWork _unit;
    private readonly IMapper _mapper;

    public OrderController(IUnitOfWork unit, IMapper mapper)
    {
      _unit = unit;
      _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<List<Order>>> GetOrders([FromQuery] int? serviceOrderId)
    {
      return Ok(await _unit.OrderRepository.GetOrdersAsync(serviceOrderId));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Order>> GetOrderById(int id)
    {
      return Ok(await _unit.OrderRepository.GetOrderByIdAsync(id));
    }

    [HttpPost]
    public async Task<IActionResult> CreateOrder(Order order)
    {
      await _unit.OrderRepository.CreateOrderAsync(order);

      if (await _unit.Complete())
      {
        return Ok();
      }

      return BadRequest("Problem creating the order");
    }
  }
}