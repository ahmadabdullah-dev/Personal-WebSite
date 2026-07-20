using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/home")]
    public class HomeController : ControllerBase
    {
        private readonly HomeService _homeService;
        public HomeController(HomeService homeService)
        {
            _homeService = homeService;
        }
        [HttpGet("read")]
        public async Task<IActionResult> ReadHome()
        {
            var result = await _homeService.ReadHomeAsync();
            return result.IsSuccess ? Ok(result) : BadRequest(result);
        }
        [Authorize]
        [HttpPost("create")]
        public async Task<IActionResult> CreateHome(HomeDTO dto)
        {
            var result = await _homeService.CreateHomeAsync(dto);
            return result.IsSuccess ? Ok(result) : BadRequest(result);
        }
        [Authorize]
        [HttpPut("update")]
        public async Task<IActionResult> UpdateHome(HomeDTO dto)
        {
            var result = await _homeService.UpdateHomeAsync(dto);
            return result.IsSuccess ? Ok(result) : BadRequest(result);
        }
        [Authorize]
        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteHome()
        {
            var result = await _homeService.DeleteHomeAsync();
            return result.IsSuccess ? Ok(result) : BadRequest(result);
        }
    }
}
