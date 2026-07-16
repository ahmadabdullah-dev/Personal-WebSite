using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/user")]
public class UserController: ControllerBase
{
    private readonly UserService _userService;
    public UserController(UserService userService)
    {
        _userService = userService;
    }
    [HttpGet("current")]
    public async Task<IActionResult> CurrentUser()
    {
        var result = await _userService.CurrentUserAsync();
        return result.IsSuccess ? Ok(result) : Unauthorized(result);
    }
}
