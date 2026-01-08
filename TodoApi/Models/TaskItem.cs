using System.ComponentModel.DataAnnotations;

namespace TodoApi.Models;

public class TaskItem
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public bool IsDone { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    [Required]
    public int UserId { get; set; }
    public User? User { get; set; }
}