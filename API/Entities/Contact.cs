using System.ComponentModel.DataAnnotations;

namespace API.Entities;

public class Contact : BaseEntity
{
    [Required]
    [MaxLength(36)]
    public string FullName { get; set; } = string.Empty;
    
    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;
    
    [Required]
    [MaxLength(2048)]
    public string Message {  get; set; } = string.Empty;
}
