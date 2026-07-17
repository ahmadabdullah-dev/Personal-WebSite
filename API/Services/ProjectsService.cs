using System.Text.RegularExpressions;

namespace API.Services;

public class ProjectService
{
    private readonly ProjectRepository _projectRepository;

    public ProjectService(ProjectRepository projectRepository)
    {
        _projectRepository = projectRepository;
    }

    public async Task<Result<ProjectDTO>> GetBySlugAsync(string slug)
    {
        var project = await _projectRepository.GetBySlugAsync(slug);

        if (project == null)
            return Result<ProjectDTO>.Failure("Project not found");

        var dto = new ProjectDTO
        {
            Slug = project.Slug,
            Name = project.Name,
            ShortDescription = project.ShortDescription,
            LongDescription = project.LongDescription,
            LiveLink = project.LiveLink,
            GithubLink = project.GithubLink,
            TechStack = project.TechStack
        };

        return Result<ProjectDTO>.Success(dto);
    }

    public async Task<Result<PagedList<ProjectDTO>>> GetProjectsAsync(PaginationParams p)
    {
        var projects = await _projectRepository.GetProjectsAsync(p);

        var dtos = new PagedList<ProjectDTO>
        {
            Items = projects.Items.Select(x => new ProjectDTO
            {
                Slug = x.Slug,
                Name = x.Name,
                ShortDescription = x.ShortDescription,
                LongDescription = x.LongDescription,
                LiveLink = x.LiveLink,
                GithubLink = x.GithubLink,
                TechStack = x.TechStack
            }).ToList(),

            CurrentPage = projects.CurrentPage,
            TotalPages = projects.TotalPages,
            TotalCount = projects.TotalCount
        };

        return Result<PagedList<ProjectDTO>>.Success(dtos);
    }

    public async Task<Result<string>> CreateProjectAsync(CreateProjectDTO dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Slug) || !Regex.IsMatch(dto.Slug, @"^[a-z0-9]+(-[a-z0-9]+)*$"))
            return Result<string>.Failure("Invalid slug format");
        
        if (await _projectRepository.GetBySlugAsync(dto.Slug) != null)
            return Result<string>.Failure("Slug Already Exists");
        
        var project = new Project
        {
            Slug = dto.Slug,
            Name = dto.Name,
            ShortDescription = dto.ShortDescription,
            LongDescription = dto.LongDescription,
            GithubLink = dto.GithubLink,
            LiveLink = dto.LiveLink,
            TechStack = dto.TechStack,
        };

        var createdId = await _projectRepository.CreateProjectAsync(project);

        if (string.IsNullOrEmpty(createdId))
            return Result<string>.Failure("Unexpected error occurred while creating the project");

        return Result<string>.Success("Project Created Successfully");
    }
    public async Task<Result<string>> UpdateProjectAsync(string slug, UpdateProjectDTO dto)
    {
        var project = await _projectRepository.GetBySlugAsync(slug);

        if (project == null)
            return Result<string>.Failure("Project not found");

        if (!string.IsNullOrWhiteSpace(dto.Slug) && dto.Slug != project.Slug)
        {
            var existing = await _projectRepository.GetBySlugAsync(dto.Slug);
            
            if (existing != null)
                return Result<string>.Failure("Slug already exists");

            project.Slug = dto.Slug;
        }

        if (!string.IsNullOrWhiteSpace(dto.Name))
            project.Name = dto.Name;

        if (!string.IsNullOrWhiteSpace(dto.ShortDescription))
            project.ShortDescription = dto.ShortDescription;

        if (!string.IsNullOrWhiteSpace(dto.LongDescription))
            project.LongDescription = dto.LongDescription;

        if (dto.TechStack != null)
            project.TechStack = dto.TechStack;

        if (!string.IsNullOrWhiteSpace(dto.GithubLink))
            project.GithubLink = dto.GithubLink;

        if (!string.IsNullOrWhiteSpace(dto.LiveLink))
            project.LiveLink = dto.LiveLink;

        project.UpdatedAt = DateTime.UtcNow;

        var updated = await _projectRepository.UpdateProjectAsync(project);

        if (!updated)
            return Result<string>.Failure("Unexpected error occurred while updating the project");

        return Result<string>.Success("Project Updated Successfully");
    }

    public async Task<Result<string>> DeleteProjectAsync(string slug)
    {
        var project = await _projectRepository.GetBySlugAsync(slug);

        if (project == null)
            return Result<string>.Failure("Project not found");

        var deleted = await _projectRepository.DeleteProjectAsync(project);

        if (!deleted)
            return Result<string>.Failure("Unexpected error occurred while deleting the project");

        return Result<string>.Success("Project deleted successfully");
    }
}