namespace API.DTOs;

public record ContactDTO(string FullName, string Email, string Message, DateTime SentAt);
public record CreateContactDTO(string FullName, string Email, string Message);
