using System.Net.Http.Headers;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;

public class EmailService
{
    private readonly EmailConfiguration _emailConfig;
    private readonly UserManager<AppUser> _userManager;
    private readonly ILogger<EmailService> _logger;
    private readonly HttpClient _httpClient;

    public EmailService(
        IOptions<EmailConfiguration> emailConfig,
        UserManager<AppUser> userManager,
        ILogger<EmailService> logger,
        IHttpClientFactory httpClientFactory)
    {
        _emailConfig = emailConfig.Value;
        _userManager = userManager;
        _logger = logger;
        _httpClient = httpClientFactory.CreateClient();
        _httpClient.BaseAddress = new Uri("https://api.resend.com/");
        _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _emailConfig.ResendApiKey);
    }

    public async Task SendEmailAsync(string to, string subject, string htmlContent)
    {
        var payload = new
        {
            from = _emailConfig.From,
            to = new[] { to },
            subject,
            html = htmlContent
        };

        var response = await _httpClient.PostAsJsonAsync("emails", payload);

        if (!response.IsSuccessStatusCode)
        {
            var error = await response.Content.ReadAsStringAsync();
            _logger.LogError($"Failed to send email to {to}: {response.StatusCode} - {error}");
            response.EnsureSuccessStatusCode();
        }

        _logger.LogInformation($"Email sent to {to}");
    }

    public async Task SendCodeAsync(AppUser user, string emailSubject, string purpose, string? differentEmail = null)
    {
        var code = await _userManager.GenerateUserTokenAsync(user, TokenOptions.DefaultEmailProvider, purpose);

        var html = $"<p>Your {emailSubject} code is: <strong>{code}</strong></p>";

        var targetEmail = differentEmail ?? user.Email!;

        await SendEmailAsync(targetEmail, emailSubject, html);

        _logger.LogInformation($"{emailSubject} sent to {targetEmail}");
    }
}