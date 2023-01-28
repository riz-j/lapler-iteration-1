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
    public ActionResult<Project> CreateProject(ProjectDTO projectDTO)
    {
        return _projectsService.CreateProject(projectDTO);
    }

    [HttpPost("{id:int}")]
    public IActionResult AddUsersToProject(int id, [FromBody]AddUsersToProjectDTO addUsersToProjectDTO)
    {
        return _projectsService.AddUsersToProject(id, addUsersToProjectDTO);
    }

    [HttpGet("{id:int}")]
    public ActionResult<ProjectWithNamesDTO> GetProjectWithNames(int id)
    {
        return _projectsService.GetProjectWithNames(id);
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
