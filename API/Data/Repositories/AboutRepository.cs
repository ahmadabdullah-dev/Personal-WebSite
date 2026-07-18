using Microsoft.EntityFrameworkCore;

namespace API.Data.Repositories;

public class AboutRepository
{
    private readonly ApplicationDbContext _context;

    public AboutRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<string> CreateAboutAsync(About about)
    {
        _context.Add(about);
        await _context.SaveChangesAsync();

        return about.Id;
    }

    public async Task<bool> DeleteAboutAsync(About about)
    {
        _context.Remove(about);
        var affected = await _context.SaveChangesAsync();

        return affected > 0;
    }

    public async Task<bool> UpdateAboutAsync(About about)
    {
        _context.Update(about);
        var affected = await _context.SaveChangesAsync();

        return affected > 0;
    }

    public async Task<About?> GetAboutAsync()
    {
        return await _context.About.FirstOrDefaultAsync();
    }
}