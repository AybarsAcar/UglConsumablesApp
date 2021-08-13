using System.Threading.Tasks;
using API.Interfaces;
using Microsoft.Extensions.Configuration;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace API.Services
{
  public class EmailSender : IEmailSender
  {
    private readonly IConfiguration _config;

    public EmailSender(IConfiguration config)
    {
      _config = config;
    }

    public async Task SendEmailAsync(string userEmail, string emailSubject, string message)
    {
      var client = new SendGridClient(_config["SendGrid:Key"]);

      var msg = new SendGridMessage
      {
        From = new EmailAddress("oaca0001@student.monash.edu", _config["SendGrid:User"]),
        Subject = emailSubject,
        PlainTextContent = message,
        HtmlContent = message,
      };
      
      msg.AddTo(new EmailAddress(userEmail));
      msg.SetClickTracking(false, false);

      await client.SendEmailAsync(msg);
    }
  }
}