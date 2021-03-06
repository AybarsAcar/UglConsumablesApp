using System;

namespace API.Entities.Account
{
  /// <summary>
  /// refresh token is stored in the db
  /// </summary>
  public class RefreshToken
  {
    public int Id { get; set; }
    public AppUser AppUser { get; set; }
    public string Token { get; set; }

    public DateTime Expires { get; set; } = DateTime.UtcNow.AddDays(7);
    public bool IsExpired => DateTime.UtcNow >= Expires;

    public DateTime? Revoked { get; set; }
    public bool IsActive => Revoked == null && !IsExpired;
  }
}