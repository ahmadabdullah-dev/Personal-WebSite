namespace API.Services;

public class SkillsService
{
    private readonly SkillsRepository _skillsRepository;
    public SkillsService(SkillsRepository skillsRepository)
    {
        _skillsRepository = skillsRepository;
    }

    public async Task<Result<string>> CreateSkillAsync(SkillDTO dto)
    {
        var entity = new Skill()
        {
            Name = dto.Name,
        };
        var result =  await _skillsRepository.CreateSkillAsync(entity);
        return result != null ? Result<string>.Success("Skill Created Successfully") : Result<string>.Failure("Unexpected error happened while creating the skill "); 
    }
    public async Task<Result<string>> DeleteSkillAsync( SkillDTO dto)
    {
        var skill = await _skillsRepository.ReadSkillAsync(dto.Name);

        if (skill == null)
            return Result<string>.Failure("Skill not found");

       var isDeleted = await _skillsRepository.DeleteSkillAsync(skill);

       return isDeleted ? Result<string>.Success("Skill deleted successfully") : Result<string>.Failure("Unexpected error happened while deleting the skill");
    }
    public async Task<Result<List<SkillDTO>>> ReadSkillsAsync()
    {
        var skills = await _skillsRepository.ReadSkillsAsync();
       
        var dtos = skills.Select(s => new SkillDTO(s.Name)).ToList();

        if (dtos.Count == 0)
            return Result<List<SkillDTO>>.Failure("No Skills Found");

        return Result<List<SkillDTO>>.Success(dtos);
    }
}
 