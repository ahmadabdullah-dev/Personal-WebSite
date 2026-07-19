using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/contact")]
public class ContactController : ControllerBase
{
    private readonly ContactService _contactService;
    public ContactController(ContactService contactService)
    {
        _contactService = contactService;
    }
    [HttpPost("send")]
    public async Task<IActionResult> SendMessage(CreateContactDTO dto)
    {
        var result = await _contactService.CreateContactAsync(dto);
        return result.IsSuccess ? Ok(result) : BadRequest(result);
    }
    [Authorize]
    [HttpGet("all")]
    public async Task<IActionResult> GetAll([FromQuery] PaginationParams p)
    {
        var result = await _contactService.GetContactsAsync(p);
        return result.IsSuccess ? Ok(result) : BadRequest(result);
    }
}
