namespace API.Dtos;
public record RequestLoginDto(
    string Email,
    string Password
);
public record LoginDto(
    string Email,
    string Code,
    bool IsPersistence
);
