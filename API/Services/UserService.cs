using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace API.Services
{
    public class UserService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly UserManager<AppUser> _userManager;

        public UserService(IHttpContextAccessor httpContextAccessor, UserManager<AppUser> userManager)
        {
            _httpContextAccessor = httpContextAccessor;
            _userManager = userManager;
        }
        public string? GetCurrentUserId()
        {
            return _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);
        }
        public async Task<Result<UserDTO>> CurrentUserAsync()
        {
            var userId = GetCurrentUserId();

            if (string.IsNullOrEmpty(userId))
                return Result<UserDTO>.Failure("You must be logged in to perform this action.");

            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
                return Result<UserDTO>.Failure("We couldn't find your account. It may have been removed or deactivated.");


            var userDTO = new UserDTO
            (
                user.Email!
            );

            return Result<UserDTO>.Success(userDTO);
        }
    }
}
