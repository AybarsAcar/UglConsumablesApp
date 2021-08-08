using API.Entities;
using API.Entities.Account;
using API.Entities.Order;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
  public class DataContext : IdentityDbContext<AppUser>
  {
    public DataContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<Consumable> Consumables { get; set; }
    public DbSet<AreaOfWork> AreaOfWorks { get; set; }
    public DbSet<Order> Orders { get; set; }
  }
}