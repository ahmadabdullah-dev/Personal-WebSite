using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/about")]
    public class AboutController : ControllerBase
    {
        private readonly AboutService _aboutService;
        public AboutController(AboutService aboutService)
        {
            _aboutService = aboutService;
        }
        [HttpGet("read")]
        public async Task<IActionResult> ReadAbout()
        {
            var result = await _aboutService.ReadAboutAsync();
            return result.IsSuccess ? Ok(result) : BadRequest(result);
        }
        [Authorize]
        [HttpPost("create")]
        public async Task<IActionResult> CreateAbout(AboutDTO dto)
        {
            var result = await _aboutService.CreateAboutAsync(dto);
            return result.IsSuccess ? Ok(result) : BadRequest(result);
        }
        [Authorize]
        [HttpPut("update")]
        public async Task<IActionResult> UpdateAbout(AboutDTO dto)
        {
            var result = await _aboutService.UpdateAboutAsync(dto);
            return result.IsSuccess ? Ok(result) : BadRequest(result);
        }
        [Authorize]
        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteAbout()
        {
            var result = await _aboutService.DeleteAboutAsync();
            return result.IsSuccess ? Ok(result) : BadRequest(result);
        }
    }
}
