using Microsoft.EntityFrameworkCore;

namespace API.Data.Repositories;

public class HomeRepository
{
    private readonly ApplicationDbContext _context;

    public HomeRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<string> CreateHomeAsync(Home home)
    {
        _context.Add(home);
        await _context.SaveChangesAsync();

        return home.Id;
    }

    public async Task<bool> DeleteHomeAsync(Home home)
    {
        _context.Remove(home);
        var affected = await _context.SaveChangesAsync();

        return affected > 0;
    }

    public async Task<bool> UpdateHomeAsync(Home home)
    {
        _context.Update(home);
        var affected = await _context.SaveChangesAsync();

        return affected > 0;
    }

    public async Task<Home?> GetHomeAsync()
    {
        return await _context.Home.FirstOrDefaultAsync();
    }
}