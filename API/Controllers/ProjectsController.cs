using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;


[ApiController]
[Route("api/projects")]
public class ProjectsController: ControllerBase
{
    private readonly ProjectService _projectService;
    public ProjectsController(ProjectService projectService)
    {
        _projectService = projectService;
    }
    [HttpGet("slug")]
    public async Task<IActionResult> GetBySlug([FromQuery] SlugDTO dto)
    {
        var result = await _projectService.GetBySlugAsync(dto.slug);
        return result.IsSuccess ? Ok(result) : NotFound(result);
    }

    [HttpGet("all")]
    public async Task<IActionResult> GetAll([FromQuery] PaginationParams p)
    {
        var result = await _projectService.GetProjectsAsync(p);
        return result.IsSuccess ? Ok(result) : BadRequest(result);
    }

    [HttpPost("create")]
    public async Task<IActionResult> Create([FromBody] CreateProjectDTO dto)
    {
        var result = await _projectService.CreateProjectAsync(dto);
        return result.IsSuccess ? Ok(result) : BadRequest(result);
    }
    [HttpPut("{slug}")]
    public async Task<IActionResult> Update([FromRoute] string slug, [FromBody] UpdateProjectDTO dto)
    {
        var result = await _projectService.UpdateProjectAsync(slug, dto);
        return result.IsSuccess ? Ok(result) : BadRequest(result);
    }

    [HttpDelete("{slug}")]
    public async Task<IActionResult> Delete([FromRoute] string slug)
    {
        var result = await _projectService.DeleteProjectAsync(slug);
        return result.IsSuccess ? Ok(result) : BadRequest(result);
    }
}
