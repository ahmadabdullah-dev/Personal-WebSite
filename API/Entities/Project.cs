using System.ComponentModel.DataAnnotations;

namespace API.Entities;

public class Project : BaseEntity
{
    [Required]  
    [MaxLength(32)]
    public string Slug { get; set; }  = string.Empty;

    [Required]
    [MaxLength(32)]
    public string Name { get; set; } = string.Empty;

    [MaxLength(256)]
    public string ShortDescription { get; set; } = string.Empty;

    [MaxLength(1024)]
    public string LongDescription { get; set; } = string.Empty;

    public string TechStack { get; set; } = string.Empty;

    [Url]
    public string GithubLink { get; set; } = string.Empty;

    [Url]
    public string LiveLink { get; set; } = string.Empty;
}   