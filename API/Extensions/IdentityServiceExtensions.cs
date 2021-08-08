using System;
using System.Text;
using API.Data;
using API.Entities;
using API.Entities.Account;
using API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace API.Extensions
{
  public static class IdentityServiceExtensions
  {
    public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration config)
    {
      // add the identity core
      // pass in options
      services.AddIdentityCore<AppUser>(opt => { opt.Password.RequireNonAlphanumeric = true; })
        .AddEntityFrameworkStores<DataContext>()
        .AddSignInManager<SignInManager<AppUser>>()
        .AddDefaultTokenProviders();


      services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(opt =>
        {
          // authentication for requests
          opt.TokenValidationParameters = new TokenValidationParameters
          {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"])),
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ClockSkew = TimeSpan.Zero // as soon as the token expires it invalidates the token
          };
        });
      
      services.AddAuthorization(opt => { opt.AddPolicy("RequireAdminRole", policy => policy.RequireRole("Admin")); });

      services.AddScoped<TokenService>();

      return services;
    }
  }
}