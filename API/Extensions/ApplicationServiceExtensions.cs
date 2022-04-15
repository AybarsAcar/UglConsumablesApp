using System;
using API.Data;
using API.Data.Repositories;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using API.Services;
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
      services.AddSwaggerGen(c => { c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" }); });

      // database connection for development and production
      // copied from StackOverflow
      services.AddDbContext<DataContext>(options =>
      {
        var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

        string connStr;

        // Depending on if in development or production, use either Heroku-provided
        // connection string, or development connection string from env var.
        if (env == "Development")
        {
          // Use connection string from appsettings.Development.json
          connStr = config.GetConnectionString("DefaultConnection");
        }
        else
        {
          // Following executes in Production
          // Use connection string provided at runtime by Heroku.
          var connUrl = Environment.GetEnvironmentVariable("DATABASE_URL");

          // Parse connection URL to connection string for Npgsql
          connUrl = connUrl.Replace("postgres://", string.Empty);
          var pgUserPass = connUrl.Split("@")[0];
          var pgHostPortDb = connUrl.Split("@")[1];
          var pgHostPort = pgHostPortDb.Split("/")[0];
          var pgDb = pgHostPortDb.Split("/")[1];
          var pgUser = pgUserPass.Split(":")[0];
          var pgPass = pgUserPass.Split(":")[1];
          var pgHost = pgHostPort.Split(":")[0];
          var pgPort = pgHostPort.Split(":")[1];

          connStr =
            $"Server={pgHost};Port={pgPort};User Id={pgUser};Password={pgPass};Database={pgDb}; SSL Mode=Require; Trust Server Certificate=true";
        }

        // Whether the connection string came from the local development configuration file
        // or from the environment variable from Heroku, use it to set up your DbContext.
        options.UseNpgsql(connStr);
      });
      
      services.AddCors(opt =>
      {
        opt.AddPolicy("CorsPolicy",
          policy =>
          {
            policy
              .AllowAnyHeader()
              .AllowAnyMethod()
              // .AllowCredentials()
              .WithExposedHeaders("WWW-Authenticate", "Pagination")
              .AllowAnyOrigin(); /* .WithOrigins("http://localhost:3000"); */
          });
      });

      // tell automapper where to find the mapper profiles
      services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);


      // repositories
      services.AddScoped<IUnitOfWork, UnitOfWork>();

      // email service
      services.AddScoped<IEmailSender, EmailSender>();

      return services;
    }
  }
}