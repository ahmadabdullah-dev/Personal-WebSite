using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/skills")]
public class SkillsController : ControllerBase
{
    private readonly SkillsService _skillsService;
    public SkillsController(SkillsService skillsService)
    {
        _skillsService = skillsService;
    }
    [HttpGet("all")]
    public async Task<IActionResult> GetSkills()
    {
        var result = await _skillsService.ReadSkillsAsync();
        return result.IsSuccess ? Ok(result) : BadRequest(result);
    }
    [HttpPost("create")]
    public async Task<IActionResult> CreateSkill(SkillDTO dto)
    {
        var result = await _skillsService.CreateSkillAsync(dto);
        return result.IsSuccess ? Ok(result) : BadRequest(result);
    }
    [HttpDelete("delete")]
    public async Task<IActionResult> DeleteSkill(SkillDTO dto)
    {
        var result = await _skillsService.DeleteSkillAsync(dto);
        return result.IsSuccess ? Ok(result) : BadRequest(result);
    }
}
