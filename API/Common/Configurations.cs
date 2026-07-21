namespace API.Common;

public sealed class EmailConfiguration
{
    public string From { get; set; } = "";
    public string ResendApiKey { get; set; } = "";
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
public sealed class CloudinaryConfigurations
{
    public required string CloudName { get; set; }
    public required string ApiKey { get; set; }
    public required string ApiSecret { get; set; }
}