using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;

namespace API;

public static class DependencyInjection
{
    public static IServiceCollection AddAPI(this IServiceCollection services, IConfiguration configuration)
    {
        services.ConfigureApplicationCookie(options =>
        {
            options.Cookie.SameSite = SameSiteMode.None;
            options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
            options.Cookie.HttpOnly = true;
            options.ExpireTimeSpan = TimeSpan.FromDays(7);
            options.SlidingExpiration = true;
        });
        var allowedOrigins = configuration.GetSection("Cors:AllowedOrigins").Get<string[]>()
           ?? throw new InvalidOperationException("Cors:AllowedOrigins is not configured.");

        services.AddCors(options =>
        {
            options.AddPolicy("AllowWeb",
                policy =>
                {
                    policy.WithOrigins(allowedOrigins)
                          .AllowAnyHeader()
                          .AllowAnyMethod()
                          .AllowCredentials();
                });
        });
        
        services.AddRateLimiter(options =>
        {
            options.AddFixedWindowLimiter("rateLimiter", opt =>
            {
                opt.Window = TimeSpan.FromSeconds(10);
                opt.PermitLimit = 5;
                opt.QueueLimit = 0;
            });

            options.RejectionStatusCode = 429; 
        });

        services.AddDbContext<ApplicationDbContext>(opt =>
        {
            var connectionString = configuration.GetConnectionString("DefaultConnection");

            if (string.IsNullOrEmpty(connectionString))
            {
                connectionString = Environment.GetEnvironmentVariable("ConnectionStrings__DefaultConnection");
            }


            if (string.IsNullOrEmpty(connectionString))
            {
                throw new InvalidOperationException("Database connection string is not configured.");
            }

            opt.UseNpgsql(connectionString, sql =>
            {
                sql.EnableRetryOnFailure(maxRetryCount: 3, maxRetryDelay: TimeSpan.FromSeconds(5), errorCodesToAdd: null);
            });
        });
        services.AddIdentity<AppUser, IdentityRole>(options =>
        {
            options.User.RequireUniqueEmail = true;

            options.Lockout.AllowedForNewUsers = true;
            options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(3);
            options.Lockout.MaxFailedAccessAttempts = 10;
           
            options.Password.RequireDigit = true;
            options.Password.RequiredLength = 6;
        })
        .AddEntityFrameworkStores<ApplicationDbContext>()
        .AddDefaultTokenProviders();
       
        services.Configure<EmailConfiguration>(configuration.GetSection("EmailConfiguration"));
        services.Configure<AdminConfiguration>(configuration.GetSection("Seed:Admin"));
        services.Configure<RecieverConfiguration>(configuration.GetSection("Reciever"));
        services.Configure<CloudinaryConfigurations>(configuration.GetSection("Cloudinary"));

        services.AddScoped<AuthService>();
        services.AddScoped<EmailService>();
        services.AddScoped<ContactService>();   
        services.AddScoped<UserService>();
        services.AddScoped<ContactService>();
        services.AddScoped<HomeService>();
        services.AddScoped<ContactService>();
        services.AddScoped<ProjectService>();
        services.AddScoped<SkillsService>();
        services.AddScoped<AboutService>();
        services.AddScoped<FileService>();

        services.AddScoped<ProjectRepository>();
        services.AddScoped<HomeRepository>();
        services.AddScoped<ContactRepository>();
        services.AddScoped<SkillsRepository>();
        services.AddScoped<AboutRepository>();


        services.AddDataProtection();

        return services;
    }
}
