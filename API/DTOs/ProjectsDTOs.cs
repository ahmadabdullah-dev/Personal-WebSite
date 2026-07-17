using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public record ProjectDTO
{
    public string Slug { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string ShortDescription { get; set; } = string.Empty;
    public string LongDescription { get; set; } = string.Empty;
    public string TechStack { get; set; } = string.Empty;
    public string GithubLink { get; set; } = string.Empty;
    public string LiveLink { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
}
public record CreateProjectDTO
{
    [Required]
    [MaxLength(32)]
    public string Slug { get; set; } = string.Empty;

    [Required]
    [MaxLength(32)]
    public string Name { get; set; } = string.Empty;

    [MaxLength(256)]
    public string ShortDescription { get; set; } = string.Empty;

    [MaxLength(1024)]
    public string LongDescription { get; set; } = string.Empty;

    public string TechStack { get; set; } = string.Empty;

    public string GithubLink { get; set; } = string.Empty;

    public string LiveLink { get; set; } = string.Empty;
}

public record UpdateProjectDTO
{
    [MaxLength(32)]
    public string Slug { get; set; } = string.Empty;

    [MaxLength(32)]
    public string Name { get; set; } = string.Empty;

    [MaxLength(256)]
    public string ShortDescription { get; set; } = string.Empty;

    [MaxLength(1024)]
    public string LongDescription { get; set; } = string.Empty;

    public string TechStack { get; set; } = string.Empty;
    
    public string GithubLink { get; set; } = string.Empty;

    public string LiveLink { get; set; } = string.Empty;
}
