using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using rest_api_v2.Controllers.Services;
using rest_api_v2.Models;

namespace rest_api_v2;

[ApiController]
[Route("api/[controller]")]
public class ProjectsController : ControllerBase
{
    private ProjectsService _projectsService;
    public ProjectsController(ProjectsService projectsService)
    {
        _projectsService = projectsService;
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
        if (!_projectsService.IsProjectMember(projectId, Authorization))
        {
            return Forbid();
        }

        return _projectsService.AddUsersToProject(projectId, addUsersToProjectDTO);
    }

    [Authorize]
    [HttpGet("{projectId:int}")]
    public ActionResult<ProjectWithNamesDTO> GetProjectWithNames(int projectId, [FromHeader]string Authorization)
    {
        if (!_projectsService.IsProjectMember(projectId, Authorization))
        {
            return Forbid();
        }

        return _projectsService.GetProjectWithNames(projectId);
    }

    [Authorize]
    [HttpPut("{projectId:int}")]
    public ActionResult<Project> UpdateProject(int projectId, [FromBody]ProjectDTO projectDTO, [FromHeader]string Authorization)
    {
        if (!_projectsService.IsProjectMember(projectId, Authorization))
        {
            return Forbid();
        }

        return _projectsService.UpdateProject(projectId, projectDTO);
    }

    [Authorize]
    [HttpDelete("{projectId:int}")]
    public IActionResult DeleteProject(int projectId, [FromHeader]string Authorization)
    {
        if (!_projectsService.IsProjectMember(projectId, Authorization))
        {
            return Forbid();
        }

        return _projectsService.DeleteProject(projectId);
    }
}
