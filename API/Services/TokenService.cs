using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using API.Entities;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace API.Services
{
  public class TokenService
  {
    private readonly IConfiguration _config;

    public TokenService(IConfiguration config)
    {
      _config = config;
    }

    public string CreateToken(AppUser user)
    {
      // set the claims we want to track in our token
      var claims = new List<Claim>
      {
        new(ClaimTypes.Name, user.UserName),
        new(ClaimTypes.NameIdentifier, user.Id),
        new(ClaimTypes.Email, user.Email),
      };

      var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["TokenKey"]));

      var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

      var tokenDescriptor = new SecurityTokenDescriptor
      {
        Subject = new ClaimsIdentity(claims),
        Expires = DateTime.UtcNow.AddMinutes(10),
        SigningCredentials = credentials,
      };

      var tokenHandler = new JwtSecurityTokenHandler();

      var token = tokenHandler.CreateToken(tokenDescriptor);

      return tokenHandler.WriteToken(token); // returns the actual jwt token
    }

    public RefreshToken GenerateRefreshToken()
    {
      var randomNumber = new byte[32];

      using var rng = RandomNumberGenerator.Create();
      rng.GetBytes(randomNumber);
      return new RefreshToken { Token = Convert.ToBase64String(randomNumber) };
    }
  }
}