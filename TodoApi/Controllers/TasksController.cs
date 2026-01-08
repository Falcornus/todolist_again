using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApi.Data;
using TodoApi.Models;

namespace TodoApi.Controllers;

[Authorize]
[ApiController]
[Route("api/tasks")]
public class TasksController(AppDbContext dbContext) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetTasks()
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var tasks = await dbContext.TaskItems.Where(t => t.UserId == userId).ToListAsync();
        return Ok(tasks);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetTask(int id)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var task = await dbContext.TaskItems.FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);
        if (task == null)
        {
            return NotFound();
        }
        return Ok(task);
    }

    [HttpPost]
    public async Task<IActionResult> CreateTask([FromBody] TaskItem task)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        task.UserId = userId;
        dbContext.TaskItems.Add(task);
        await dbContext.SaveChangesAsync();
        return CreatedAtAction(nameof(GetTask), new { id = task.Id }, task);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTask(int id, [FromBody] TaskItem updatedTask)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var task = await dbContext.TaskItems.FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);
        if (task == null)
        {
            return NotFound();
        }

        task.Title = updatedTask.Title;
        task.IsDone = updatedTask.IsDone;
        await dbContext.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTask(int id)
    {
        Console.WriteLine("DeleteTask method called");
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var task = await dbContext.TaskItems.FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);
        if (task == null)
        {
            return NotFound();
        }

        dbContext.TaskItems.Remove(task);
        await dbContext.SaveChangesAsync();
        return NoContent();
    }
}
