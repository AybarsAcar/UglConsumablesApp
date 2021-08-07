using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace API
{
  public class Program
  {
    public static async Task Main(string[] args)
    {
      var host = CreateHostBuilder(args).Build();

      using (var scope = host.Services.CreateScope())
      {
        var services = scope.ServiceProvider;
        var loggerFactory = services.GetService<ILoggerFactory>();

        try
        {
          var context = services.GetRequiredService<DataContext>();
          await context.Database.MigrateAsync();

          // TODO: update the seed data - it is noisy
          // seed data
          // await Seed.SeedAsync(context, loggerFactory);
        }
        catch (Exception e)
        {
          var logger = services.GetRequiredService<ILogger<Program>>();
          logger.LogError(e, "An error occured during migration");
        }
      }

      await host.RunAsync();
    }

    public static IHostBuilder CreateHostBuilder(string[] args) =>
      Host.CreateDefaultBuilder(args)
        .ConfigureWebHostDefaults(webBuilder => { webBuilder.UseStartup<Startup>(); });
  }
}