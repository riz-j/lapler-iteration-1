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

    [HttpPost]
    public ActionResult<Project> CreateProject(ProjectDTO projectDTO)
    {
        return _projectsService.CreateProject(projectDTO);
    }

    [HttpPost("{id:int}")]
    public IActionResult AddUsersToProject(int id, [FromBody]AddUsersToProjectDTO addUsersToProjectDTO)
    {
        return _projectsService.AddUsersToProject(id, addUsersToProjectDTO);
    }

    [Authorize]
    [HttpGet("{projectId:int}")]
    public ActionResult<ProjectWithNamesDTO> GetProjectWithNames(int projectId, [FromHeader]string Authorization)
    {
        if (!_projectsService.IsProjectMember(projectId, Authorization))
        {
            return Unauthorized(new { Message = "You are not a member of this project" });
        }

        return _projectsService.GetProjectWithNames(projectId);
    }

    [HttpPut]
    public ActionResult<Project> UpdateProject(int id, [FromBody]ProjectDTO projectDTO)
    {
        return _projectsService.UpdateProject(id, projectDTO);
    }

    [HttpDelete("{id:int}")]
    public IActionResult DeleteProject(int id)
    {
        return _projectsService.DeleteProject(id);
    }
}
