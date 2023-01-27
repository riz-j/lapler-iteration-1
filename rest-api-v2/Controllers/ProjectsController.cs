using Microsoft.AspNetCore.Mvc;
using rest_api_v2.Models;
using rest_api_v2.Services;

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
    public IActionResult CreateProject(ProjectDTO projectDTO)
    {
        _projectsService.CreateProject(projectDTO);
        return Ok();
    }

    [HttpPost("{id:int}")]
    public IActionResult AddUsersToProject(int id, [FromBody]AddUsersToProjectDTO addUsersToProjectDTO)
    {
        _projectsService.AddUsersToProject(id, addUsersToProjectDTO);
        return Ok();
    }
}
