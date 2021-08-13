using System.Threading.Tasks;

namespace API.Interfaces
{
  /// <summary>
  /// responsibilities of the email service
  /// </summary>
  public interface IEmailSender
  {
    /// <summary>
    /// sending email functionality
    /// </summary>
    /// <param name="userEmail"></param>
    /// <param name="emailSubject"></param>
    /// <param name="message"></param>
    /// <returns></returns>
    public Task SendEmailAsync(string userEmail, string emailSubject, string message);
  }
}