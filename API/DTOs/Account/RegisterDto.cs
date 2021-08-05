using System.ComponentModel.DataAnnotations;

namespace API.DTOs.Account
{
  public class RegisterDto
  {
    [Required] public string Username { get; set; }
    [Required] public string Email { get; set; }

    [Required]
    [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=/*[A-Z]).{4,8}$", ErrorMessage = "Password is weak")]
    public string Password { get; set; }
  }
}