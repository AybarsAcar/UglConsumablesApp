using API.Data;
using API.Data.Repositories;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;

namespace API.Extensions
{
  public static class ApplicationServiceExtensions
  {
    public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
    {
      services.AddSwaggerGen(c => { c.SwaggerDoc("v1", new OpenApiInfo {Title = "API", Version = "v1"}); });

      services.AddDbContext<DataContext>(opt => { opt.UseNpgsql(config.GetConnectionString("DefaultConnection")); });

      services.AddCors(opt =>
      {
        opt.AddPolicy("CorsPolicy",
          policy =>
          {
            policy
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials()
              .WithExposedHeaders("WWW-Authenticate", "Pagination")
              .WithOrigins("http://localhost:3000");
          });
      });

      // tell automapper where to find the mapper profiles
      services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);


      // repositories
      services.AddScoped<IUnitOfWork, UnitOfWork>();
      
      
      return services;
    }
  }
}