using Microsoft.AspNetCore.Mvc;
using rest_api_v2.Data;
using rest_api_v2.Models;

namespace rest_api_v2.Services;

public class ProjectsService : ControllerBase
{
    private AppDbContext _db;
    public ProjectsService(AppDbContext db)
    {
        _db = db;
    }

    public ActionResult<Project> CreateProject(ProjectDTO projectDTO)
    {
        var _project = new Project()
        {
            Name = projectDTO.Name,
            CreatedAt = DateTime.UtcNow,
            AdminId = projectDTO.AdminId
        };
        _db.Projects.Add(_project);
        _db.SaveChanges();

        return Ok(_project);
    }

    public IActionResult AddUsersToProject(int projectId, AddUsersToProjectDTO addUsersToProjectDTO)
    {
        var _project = _db.Projects.FirstOrDefault(p => p.Id == projectId);
        if (_project != null)
        {
            foreach (var id in addUsersToProjectDTO.UserIdsToAdd)
            {
                    var _user_project = new User_Project()
                    {
                        UserId = id,
                        ProjectId = _project.Id
                    };      
                    _db.Users_Projects.Add(_user_project);
                    _db.SaveChanges();
            }
            return Ok();
        }
        return NoContent();
    }

    public ActionResult<Project> UpdateProject(int projectId, ProjectDTO projectDTO)
    {
        var _project = _db.Projects.FirstOrDefault(p => p.Id == projectId);
        
        if (_project == null)
        {
            return NotFound();
        }

        _project.Name = projectDTO.Name;
        _project.AdminId = projectDTO.AdminId;

        return Ok(_project);
    }

    public IActionResult DeleteProject(int projectId)
    {
        var _project = _db.Projects.FirstOrDefault(p => p.Id == projectId);
        
        if (_project != null)
        {
            _db.Projects.Remove(_project);
            _db.SaveChanges();
            return Ok();
        }

        return NotFound();
    }
}
