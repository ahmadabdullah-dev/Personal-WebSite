namespace API.DTOs;
public record RequestLoginDTO(
    string Email,
    string Password
);
public record LoginDTO(
    string Email,
    string Code,
    bool IsPersistence
);
