using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAPI(builder.Configuration);

builder.Services.AddControllers();
builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

await DataSeeder.SeedAsync(app.Services);

app.UseRateLimiter();

app.UseHttpsRedirection();

app.UseCors("AllowWeb");

app.UseAuthorization();

app.MapControllers();

app.Run();