using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace TodoApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HealthController : ControllerBase
{
    private readonly HealthCheckService _healthCheckService;

    public HealthController(HealthCheckService healthCheckService)
    {
        _healthCheckService = healthCheckService;
    }

    /// <summary>
    /// Basic health check endpoint
    /// </summary>
    /// <returns>Health status of the API</returns>
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status503ServiceUnavailable)]
    public async Task<IActionResult> GetHealth()
    {
        var health = await _healthCheckService.CheckHealthAsync();
        
        var response = new
        {
            status = health.Status.ToString(),
            totalDuration = health.TotalDuration.TotalMilliseconds
        };

        return health.Status == HealthStatus.Healthy 
            ? Ok(response) 
            : StatusCode(StatusCodes.Status503ServiceUnavailable, response);
    }

    /// <summary>
    /// Detailed health check with all checks
    /// </summary>
    /// <returns>Detailed health status including database connectivity</returns>
    [HttpGet("ready")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status503ServiceUnavailable)]
    public async Task<IActionResult> GetReadiness()
    {
        var health = await _healthCheckService.CheckHealthAsync();
        
        var response = new
        {
            status = health.Status.ToString(),
            totalDuration = health.TotalDuration.TotalMilliseconds,
            checks = health.Entries.Select(e => new
            {
                name = e.Key,
                status = e.Value.Status.ToString(),
                duration = e.Value.Duration.TotalMilliseconds,
                description = e.Value.Description
            })
        };

        return health.Status == HealthStatus.Healthy 
            ? Ok(response) 
            : StatusCode(StatusCodes.Status503ServiceUnavailable, response);
    }
}
