namespace API.DTOs;

public record HomeDTO(string HomeImageUrl,string FullName, string Title, string Bio,string Email, string GithubLink, string LinkedInLink, string CvUrl);
public record UpdateHomeDTO( string FullName, string Title, string Bio, string Email, string GithubLink, string LinkedInLink);


public class CreateHomeDTO
{
    public string FullName { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Bio { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string GithubLink { get; set; } = string.Empty;
    public string LinkedInLink { get; set; } = string.Empty;
}
public class AddHomeFilesDTO
{
    public IFormFile? HomeImage { get; set; }
    public IFormFile? CV { get; set; }
}