using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
  public class DataContext : DbContext
  {
    public DataContext(DbContextOptions options) : base(options)
    {
    }
    
    public DbSet<Consumable> Consumables { get; set; }
    public DbSet<AreaOfWork> AreaOfWorks { get; set; }
  }
}