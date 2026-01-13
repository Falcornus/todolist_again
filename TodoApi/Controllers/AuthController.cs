using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApi.Data;
using TodoApi.Models;
using TodoApi.Services;

namespace TodoApi.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController: ControllerBase
{
     private readonly AppDbContext _context;
    private readonly JwtService _jwtService;

    public AuthController(AppDbContext context, JwtService jwtService)
    {
        _context = context;
        _jwtService = jwtService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto dto)
    {
        if (await _context.Users.AnyAsync(u => u.Username == dto.Username))
            return BadRequest("Username already exists");
        
        _jwtService.CreatePasswordHash(dto.Password, out byte[] passwordHash, out byte[] passwordSalt);
        
        var user = new User
        {
            Username = dto.Username,
            PasswordHash = passwordHash,
            PasswordSalt = passwordSalt,
            Role = "User"
        };
        
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        
        var token = _jwtService.GenerateToken(user);
        return Ok(new { Token = token });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto dto)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == dto.Username);
        
        if (user == null || !_jwtService.VerifyPasswordHash(dto.Password, user.PasswordHash, user.PasswordSalt))
            return Unauthorized("Invalid credentials");
        
        var token = _jwtService.GenerateToken(user);
        return Ok(new { Token = token });
    }
}

public record RegisterDto(string Username, string Password);
public record LoginDto(string Username, string Password);