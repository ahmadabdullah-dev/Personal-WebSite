namespace API.Common;

public sealed class EmailConfiguration
{
    public required string From { get; set; }
    public required string SmtpServer { get; set; }
    public required int Port { get; set; }
    public required string UserName { get; set; }
    public required string Password { get; set; }
    public bool EnableSsl { get; set; } = true;
}
public sealed class AdminConfiguration
{
    public required string Email { get; set; }
    public required string Password { get; set; }
}
public sealed class RecieverConfiguration
{
    public required string Email { get; set; }
}
