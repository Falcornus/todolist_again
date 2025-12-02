using System.ComponentModel.DataAnnotations;

namespace TodoApi.Models;

public class User
{
    public int Id { get; set; }

    [Required]
    [MaxLength(64)]
    public string Username { get; set; } = string.Empty;

    // Store a salted password hash for credential verification without keeping raw passwords.
    [Required]
    public byte[] PasswordHash { get; set; } = Array.Empty<byte>();

    [Required]
    public byte[] PasswordSalt { get; set; } = Array.Empty<byte>();

    [MaxLength(32)]
    public string Role { get; set; } = "User";

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
