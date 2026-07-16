using Business;
using Microsoft.AspNetCore.Identity;

namespace API.Services
{
    public class AuthService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser>  _signInManager;
        private readonly EmailService _emailService;
        private readonly ILogger<AuthService> _logger;
        public AuthService(UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager,
            EmailService emailService,
            ILogger<AuthService> logger)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _emailService  = emailService;
            _logger = logger;
        }
        public async Task<Result<string>> RequestLoginAsync(RequestLoginDTO dto)
        {
            var user = await _userManager.FindByEmailAsync(dto.Email);

            if (user == null)
                return Result<string>.Failure("Invalid email or password");

            if (await _userManager.IsLockedOutAsync(user))
                return Result<string>.Failure("User is locked. Please reset the password or wait 3 Minute.");

            var checkPasswordResult = await _userManager.CheckPasswordAsync(user, dto.Password);

            if (!checkPasswordResult)
            {
                await _userManager.AccessFailedAsync(user);
                return Result<string>.Failure("Invalid email or password");
            }

            try
            {
                await _emailService.SendCodeAsync(user, "Login Confirmation", EmailPurposes.LOGIN_CONFIRMATION);
            }
            catch (Exception ex)
            {
               _logger.LogError(ex, $"Failed to send login code to email {user.Email}");
                return Result<string>.Failure("Unable to send login code. Please try again shortly.");
            }
            return Result<string>.Success("Login Code sent successfully");
        }
        public async Task<Result<string>> LoginAsync(LoginDTO dto)
        {
            var user = await _userManager.FindByEmailAsync(dto.Email);

            if (user == null)
                return Result<string>.Failure("Invalid email or password");

            if (await _userManager.IsLockedOutAsync(user))
                return Result<string>.Failure("User is locked. Please reset the password or wait 3 minutes.");

            var isValid = await _userManager.VerifyUserTokenAsync(user, TokenOptions.DefaultEmailProvider, EmailPurposes.LOGIN_CONFIRMATION, dto.Code);

            if (!isValid)
            {
                await _userManager.AccessFailedAsync(user);
                return Result<string>.Failure("Invalid or expired code.");
            }

            await _signInManager.SignInAsync(user, dto.IsPersistence);
            await _userManager.ResetAccessFailedCountAsync(user);
            await _userManager.SetLockoutEndDateAsync(user, null);
            await _userManager.UpdateSecurityStampAsync(user);

            return Result<string>.Success("Logged in successfully");
        }
        public async Task<Result<string>> LogoutAsync()
        {
            await _signInManager.SignOutAsync();

            return Result<string>.Success("Logged out successfully");
        }
    }
}
