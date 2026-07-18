namespace API.Entities;

public class About : BaseEntity
{
    public string FullName { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Bio { get; set; } = string.Empty;
    public string GithubLink {  get; set; } = string.Empty;
    public string LinkedInLink {  get; set; } = string.Empty;
}
