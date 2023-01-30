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
    public ProjectsController(ProjectsService projectsService, AuthService authService)
    {
        _projectsService = projectsService;
        _authService = authService;
    }

    [Authorize]
    [HttpPost]
    public ActionResult<Project> CreateProject(ProjectDTO projectDTO)
    {
        return _projectsService.CreateProject(projectDTO);
    }

    [Authorize]
    [HttpPost("{projectId:int}")]
    public IActionResult AddUsersToProject(int projectId, [FromBody]AddUsersToProjectDTO addUsersToProjectDTO, [FromHeader]string Authorization)
    {
        if (!_authService.IsProjectMember(projectId, Authorization))
        {
            return Forbid();
        }

        if (!_authService.IsProjectAdmin(projectId, Authorization))
        {
            return Forbid();
        }

        return _projectsService.AddUsersToProject(projectId, addUsersToProjectDTO);
    }

    /*
    /*
    /*     Remove Users From Project
    /*
    */

    [Authorize]
    [HttpGet("{projectId:int}")]
    public ActionResult<ProjectWithNamesDTO> GetProjectWithNames(int projectId, [FromHeader]string Authorization)
    {
        if (!_authService.IsProjectMember(projectId, Authorization))
        {
            return Forbid();
        }

        return _projectsService.GetProjectWithNames(projectId);
    }

    [Authorize]
    [HttpPut("{projectId:int}")]
    public ActionResult<Project> UpdateProject(int projectId, [FromBody]ProjectDTO projectDTO, [FromHeader]string Authorization)
    {
        if (!_authService.IsProjectMember(projectId, Authorization))
        {
            return Forbid();
        }

        if (!_authService.IsProjectAdmin(projectId, Authorization))
        {
            return Forbid();
        }

        return _projectsService.UpdateProject(projectId, projectDTO);
    }

    [Authorize]
    [HttpDelete("{projectId:int}")]
    public IActionResult DeleteProject(int projectId, [FromHeader]string Authorization)
    {
        if (!_authService.IsProjectMember(projectId, Authorization))
        {
            return Forbid();
        }

        if (!_authService.IsProjectAdmin(projectId, Authorization))
        {
            return Forbid();
        }

        return _projectsService.DeleteProject(projectId);
    }
}
