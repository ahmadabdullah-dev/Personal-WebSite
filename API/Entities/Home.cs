namespace API.Entities;

public class Home : BaseEntity
{
    public string HeroImageURL { get; set; } = string.Empty;
    public string FullName { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Bio { get; set; } = string.Empty;
    public string Email {  get; set; } = string.Empty;
    public string GithubLink {  get; set; } = string.Empty;
    public string LinkedInLink {  get; set; } = string.Empty;
    public string CVURL {  get; set; } = string.Empty;
}
