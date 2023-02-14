using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using rest_api_v2.Controllers.Services;
using rest_api_v2.Models;
using rest_api_v2.Security.Services;

namespace rest_api_v2;

[ApiController]
[Route("api/[controller]")]
public class ProjectsController : ControllerBase
{
    private ProjectsService _projectsService;
    private AuthService _authService;
    private JWTService _JWTService;
    public ProjectsController(ProjectsService projectsService, AuthService authService, JWTService JWTService)
    {
        _projectsService = projectsService;
        _authService = authService;
        _JWTService = JWTService;
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<Project>> CreateProjectAsync(ProjectDTO projectDTO, [FromHeader]string Authorization)
    {
        int creatorId = _JWTService.ParseBearerString(Authorization).UniqueName;        
        
        Project result = await _projectsService.CreateProjectAsync(projectDTO, creatorId);

        await _projectsService.AddUsersToProjectByIdAsync(result.Id,  new List<int>() { creatorId });

        return Ok(result);
    }

    [Authorize]
    [HttpPost("{projectId:int}")]
    public async Task<IActionResult> AddUsersToProjectAsync(int projectId, [FromBody]List<string> UserEmailsToAdd, [FromHeader]string Authorization)
    {
        if (!_authService.IsProjectMember(projectId, Authorization))
        {
            return Forbid();
        }

        await _projectsService.AddUsersToProjectByEmailAsync(projectId, UserEmailsToAdd);
        return Ok();
    }

    /*
    /*
    /*     Remove Users From Project
    /*
    */
    
    [Authorize]
    [HttpGet("{projectId:int}")]
    public async Task<ActionResult<ProjectWithNamesDTO>> GetProjectWithNamesAsync(int projectId, [FromHeader]string Authorization)
    {
        if (!_authService.IsProjectMember(projectId, Authorization))
        {
            return Forbid();
        }

        var result = await _projectsService.GetProjectWithNamesAsync(projectId);
        return Ok(result);
    }

    [Authorize]
    [HttpPut("{projectId:int}")]
    public async Task<ActionResult<Project>> UpdateProjectAsync(int projectId, [FromBody]ProjectDTO projectDTO, [FromHeader]string Authorization)
    {
        if (!_authService.IsProjectMember(projectId, Authorization))
        {
            return Forbid();
        }

        var result = await _projectsService.UpdateProjectAsync(projectId, projectDTO);
        if (result == null)
        {
            return NotFound();
        }
        return result;
    }

    [Authorize]
    [HttpDelete("{projectId:int}")]
    public async Task<IActionResult> DeleteProjectAsync(int projectId, [FromHeader]string Authorization)
    {
        if (!_authService.IsProjectAdmin(projectId, Authorization))
        {
            return Forbid();
        }

        await _projectsService.DeleteProjectAsync(projectId); 
        return Ok();
    }
}
