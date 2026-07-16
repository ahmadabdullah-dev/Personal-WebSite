using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

namespace API.Controllers;

[ApiController]
[Route("api/auth")]
[EnableRateLimiting("rateLimiter")]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;
    public AuthController(AuthService authService)
    {
       _authService = authService;
    }
    [HttpPost("request-login")]
    public async Task<IActionResult> RequestLogin(RequestLoginDto dto)
    {
        var result = await _authService.RequestLoginAsync(dto);

        return result.IsSuccess ? Ok(result) : BadRequest(result);
    }
    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto dto)
    {
        var result = await _authService.LoginAsync(dto);

        return result.IsSuccess ? Ok(result) : Unauthorized(result);
    }
}
