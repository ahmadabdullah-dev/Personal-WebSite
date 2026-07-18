namespace API.Services;

public class HomeService
{
    private readonly HomeRepository _homeRepository;

    public HomeService(HomeRepository homeRepository)
    {
        _homeRepository = homeRepository;
    }
    public async Task<Result<HomeDTO>> ReadAboutAsync()
    {
        var home = await _homeRepository.GetHomeAsync();
        if (home != null)
        {
            var dto = new HomeDTO(home.FullName, home.Title, home.Bio,home.Email, home.GithubLink, home.LinkedInLink);
            return Result<HomeDTO>.Success(dto);
        }
        return Result<HomeDTO>.Failure("Current home does not found");
    }
    public async Task<Result<string>> CreateHomeAsync(HomeDTO dto)
    {
        var existing = await _homeRepository.GetHomeAsync();
        if (existing != null)
            return Result<string>.Failure("Home already exists");

        var home = new Home()
        {
            FullName = dto.FullName,
            Title = dto.Title,
            Bio = dto.Bio,
            Email = dto.Email,
            GithubLink = dto.GithubLink,
            LinkedInLink = dto.LinkedInLink,
        };

        var createdHomeId = await _homeRepository.CreateHomeAsync(home);

        return createdHomeId != null
            ? Result<string>.Success("Home Created Successfully")
            : Result<string>.Failure("An error happened while creating home");
    }

    public async Task<Result<string>> UpdateHomeAsync(HomeDTO dto)
    {
        var home = await _homeRepository.GetHomeAsync();
        if (home == null)
            return Result<string>.Failure("Current home does not exists");

        if (!string.IsNullOrEmpty(dto.FullName))
            home.FullName = dto.FullName;

        if (!string.IsNullOrEmpty(dto.Title))
            home.Title = dto.Title;

        if (!string.IsNullOrEmpty(dto.Bio))
            home.Bio = dto.Bio;

        if(!string.IsNullOrEmpty(dto.Email))
            home.Email = dto.Email;

        if (!string.IsNullOrEmpty(dto.GithubLink))
            home.GithubLink = dto.GithubLink;

        if (!string.IsNullOrEmpty(dto.LinkedInLink))
            home.LinkedInLink = dto.LinkedInLink;

        var isUpdated = await _homeRepository.UpdateHomeAsync(home);

        return isUpdated
            ? Result<string>.Success("Home updated successfully")
            : Result<string>.Failure("Unexpected error happened");
    }

    public async Task<Result<string>> DeleteHomeAsync()
    {
        var home = await _homeRepository.GetHomeAsync();
        if (home == null)
            return Result<string>.Failure("Current home does not exists");

        var isDeleted = await _homeRepository.DeleteHomeAsync(home);

        return isDeleted
            ? Result<string>.Success("Home deleted successfully")
            : Result<string>.Failure("Unexpected error happened");
    }
}