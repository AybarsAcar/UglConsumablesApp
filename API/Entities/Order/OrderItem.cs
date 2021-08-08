namespace API.Entities.Order
{
  /// <summary>
  /// included in the order
  /// this won't have its own table
  /// </summary>
  public class OrderItem
  {
    public int Id { get; set; }
    public int SapId { get; set; }
    public string Description { get; set; }
    public int Quantity { get; set; }
  }
}