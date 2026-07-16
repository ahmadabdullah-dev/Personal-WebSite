using Microsoft.EntityFrameworkCore;

namespace API.Data.Repositories;

public class ProjectRepository 
{
    private readonly ApplicationDbContext _context;
    public ProjectRepository(ApplicationDbContext context)
    {
        _context = context;
    }
    public async Task<Project?> GetBySlugAsync(string slug)
    {
        return await _context.Projects.FirstOrDefaultAsync(p => p.Slug == slug);
    }
    public async Task<PagedList<Project>> GetProjectsAsync(PaginationParams p)
    {
        return await PagedList<Project>.CreateAsync(_context.Projects,p.Page, p.PageSize);
    }
    public async Task<string> CreateProjectAsync(Project entity)
    {
        _context.Projects.Add(entity);
        await _context.SaveChangesAsync();

        return entity.Id;
    }
    public async Task<bool> UpdateProjectAsync(Project entity)
    {
        _context.Projects.Update(entity);
        var affected = await _context.SaveChangesAsync();

        return affected > 0;
    }

    public async Task<bool> DeleteProjectAsync(Project entity)
    {
        _context.Projects.Remove(entity);
        var affected = await _context.SaveChangesAsync();

        return affected > 0;
    }
}