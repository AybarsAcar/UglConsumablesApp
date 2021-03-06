using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
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
    private readonly IUserAccessor _userAccessor;
    private readonly IEmailSender _emailSender;

    public OrderController(IUnitOfWork unit, IMapper mapper, IUserAccessor userAccessor, IEmailSender emailSender)
    {
      _unit = unit;
      _mapper = mapper;
      _userAccessor = userAccessor;
      _emailSender = emailSender;
    }

    [HttpGet]
    public async Task<ActionResult<List<OrderDto>>> GetOrders([FromQuery] int? serviceOrderId)
    {
      return Ok(_mapper.Map<List<OrderDto>>(await _unit.OrderRepository.GetOrdersAsync(serviceOrderId)));
    }

    [HttpGet("list")]
    public async Task<ActionResult<List<OrderDto>>> GetUsersOrders()
    {
      // get the currently logged in user
      var username = _userAccessor.GetUsername();

      return Ok(_mapper.Map<List<OrderDto>>(await _unit.OrderRepository.GetOrdersByUsernameAsync(username)));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<OrderDetailDto>> GetOrderById(int id)
    {
      return Ok(_mapper.Map<OrderDetailDto>(await _unit.OrderRepository.GetOrderByIdAsync(id)));
    }

    [HttpPost]
    public async Task<IActionResult> CreateOrder(Order order)
    {
      // get the user from the token
      var username = _userAccessor.GetUsername();
      order.CreatedBy = username;

      await _unit.OrderRepository.CreateOrderAsync(order);

      if (!await _unit.Complete())
      {
        return BadRequest("Problem creating the order");
      }

      // send the email to the admin
      var url = $"http://localhost:3000/admin/orders/{order.Id}";

      var message =
        $"<p>Please click the link below to process the orders:</p><p><a href='{url}'>Click to view the order</a></p>";

      // TODO: add admin role and dynamically get it
      var adminEmail = "aybars.dev@gmail.com";

      await _emailSender.SendEmailAsync(adminEmail, "New Consumable List is Ordered", message);

      return Ok();
    }
  }
}