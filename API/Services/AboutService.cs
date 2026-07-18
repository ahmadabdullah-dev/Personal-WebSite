namespace API.Services;

public class AboutService
{
    private readonly AboutRepository _aboutRepository;

    public AboutService(AboutRepository aboutRepository)
    {
        _aboutRepository = aboutRepository;
    }
    public async Task<Result<AboutDTO>> ReadAboutAsync()
    {
        var about = await _aboutRepository.GetAboutAsync();
        if (about != null)
        {
            var dto = new AboutDTO(about.FullName, about.Title, about.Bio, about.GithubLink, about.LinkedInLink);
            return Result<AboutDTO>.Success(dto);
        }
        return Result<AboutDTO>.Failure("Current About does not found");
    }
    public async Task<Result<string>> AddAboutAsync(AboutDTO dto)
    {
        var existing = await _aboutRepository.GetAboutAsync();
        if (existing != null)
            return Result<string>.Failure("About already exists");

        var about = new About()
        {
            FullName = dto.FullName,
            Title = dto.Title,
            Bio = dto.Bio,
            GithubLink = dto.GithubLink,
            LinkedInLink = dto.LinkedInLink,
        };

        var createdAboutId = await _aboutRepository.AddAboutAsync(about);

        return createdAboutId != null
            ? Result<string>.Success("About Created Successfully")
            : Result<string>.Failure("An error happened while creating about");
    }

    public async Task<Result<string>> UpdateAboutAsync(AboutDTO dto)
    {
        var about = await _aboutRepository.GetAboutAsync();
        if (about == null)
            return Result<string>.Failure("Current about does not exists");

        if (!string.IsNullOrEmpty(dto.FullName))
            about.FullName = dto.FullName;

        if (!string.IsNullOrEmpty(dto.Title))
            about.Title = dto.Title;

        if (!string.IsNullOrEmpty(dto.Bio))
            about.Bio = dto.Bio;

        if (!string.IsNullOrEmpty(dto.GithubLink))
            about.GithubLink = dto.GithubLink;

        if (!string.IsNullOrEmpty(dto.LinkedInLink))
            about.LinkedInLink = dto.LinkedInLink;

        var isUpdated = await _aboutRepository.UpdateAboutAsync(about);

        return isUpdated
            ? Result<string>.Success("About updated successfully")
            : Result<string>.Failure("Unexpected error happened");
    }

    public async Task<Result<string>> DeleteAboutAsync()
    {
        var about = await _aboutRepository.GetAboutAsync();
        if (about == null)
            return Result<string>.Failure("Current about does not exists");

        var isDeleted = await _aboutRepository.DeleteAboutAsync(about);

        return isDeleted
            ? Result<string>.Success("About deleted successfully")
            : Result<string>.Failure("Unexpected error happened");
    }
}