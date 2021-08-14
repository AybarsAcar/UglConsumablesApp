using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities.Order;

namespace API.Interfaces
{
  public interface IOrderRepository
  {
    /// <summary>
    /// returns the orders
    /// if a serviceOrderId is passed in it filters by the serviceOrderId
    /// </summary>
    /// <param name="serviceOrderId"></param>
    /// <returns></returns>
    public Task<List<Order>> GetOrdersAsync(int? serviceOrderId);

    /// <summary>
    /// returns the orders by a specific user
    /// </summary>
    /// <param name="username"></param>
    /// <returns></returns>
    public Task<List<Order>> GetOrdersByUsernameAsync(string username);

    /// <summary>
    /// returns the details of an order passed in an id
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    public Task<Order> GetOrderByIdAsync(int id);

    /// <summary>
    /// creates a new order
    /// </summary>
    /// <param name="order"></param>
    /// <returns></returns>
    public Task CreateOrderAsync(Order order);
  }
}