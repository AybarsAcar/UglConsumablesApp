using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.Extensions.Logging;

namespace API.Data
{
  public class Seed
  {
    public static async Task SeedAsync(DataContext context, ILoggerFactory loggerFactory)
    {
      try
      {
        // if the table is empty seed it from our json file
        if (!context.AreaOfWorks.Any())
        {
          var areaOfWorksData = await File.ReadAllTextAsync("Data/SeedData/area_so.json");

          var areaOfWorks = JsonSerializer.Deserialize<List<AreaOfWork>>(areaOfWorksData);

          foreach (var areaOfWork in areaOfWorks)
          {
            context.AreaOfWorks.Add(areaOfWork);
          }

          await context.SaveChangesAsync();
        }

        if (!context.Consumables.Any())
        {
          var consumablesData = await File.ReadAllTextAsync("Data/SeedData/consumables.json");

          var consumables = JsonSerializer.Deserialize<List<Consumable>>(consumablesData);

          foreach (var consumable in consumables)
          {
            context.Consumables.Add(consumable);
          }

          await context.SaveChangesAsync();
        }
      }
      catch (Exception e)
      {
        var logger = loggerFactory.CreateLogger<Seed>();
        logger.LogError(e.Message);
        throw;
      }
    }
  }
}