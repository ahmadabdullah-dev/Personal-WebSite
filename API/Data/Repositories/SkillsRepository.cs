using Microsoft.EntityFrameworkCore;

namespace API.Data.Repositories;

public class SkillsRepository
{
    private readonly ApplicationDbContext _context;
    public SkillsRepository(ApplicationDbContext context)
    {
        _context = context;
    }
    public async Task<string> CreateSkillAsync(Skill skill)
    {
        _context.Skills.Add(skill);
        await _context.SaveChangesAsync();
        return skill.Id;
    }
    public async Task<bool> DeleteSkillAsync(Skill skill)
    {
        _context.Skills.Remove(skill);
        var affected =  await _context.SaveChangesAsync();
        return affected > 0;
    }
    public async Task<List<Skill>> ReadSkillsAsync()
    {
        var list = await _context.Skills.ToListAsync();

        return list;
    }
    public async Task<Skill?> ReadSkillAsync(string name)
    {
        var entity = await _context.Skills.FirstOrDefaultAsync(x => x.Name == name);
        return entity;
    }
}    
