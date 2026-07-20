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
            var dto = new AboutDTO(about.Description);
            return Result<AboutDTO>.Success(dto);
        }
        return Result<AboutDTO>.Failure("Current about does not found");
    }
    public async Task<Result<string>> CreateAboutAsync(AboutDTO dto)
    {
        var existing = await _aboutRepository.GetAboutAsync();
        if (existing != null)
            return Result<string>.Failure("About already exists");

        var about = new About()
        {
            Description = dto.Description
        };

        var createdAboutId = await _aboutRepository.CreateAboutAsync(about);

        return createdAboutId != null
            ? Result<string>.Success("About Created Successfully")
            : Result<string>.Failure("An error happened while creating about");
    }

    public async Task<Result<string>> UpdateAboutAsync(AboutDTO dto)
    {
        var home = await _aboutRepository.GetAboutAsync();
        if (home == null)
            return Result<string>.Failure("Current about does not exists");

        if (!string.IsNullOrEmpty(dto.Description))
            home.Description = dto.Description;

        var isUpdated = await _aboutRepository.UpdateAboutAsync(home);

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