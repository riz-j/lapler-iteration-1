using Microsoft.AspNetCore.Mvc;
using rest_api_v2.Data;
using rest_api_v2.Models;
using rest_api_v2.Security.Services;

namespace rest_api_v2.Controllers.Services;

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

    public ActionResult<ProjectWithNamesDTO> GetProjectWithNames(int projectId)
    {
        var _project = _db.Projects.FirstOrDefault(p => p.Id == projectId);
        
        if (_project == null)
        {
            return NotFound();
        }

        var _projectWithNames = _db.Projects.Where(p => p.Id == projectId).Select(project => new ProjectWithNamesDTO {
            Name = _project.Name,
            CreatedAt = project.CreatedAt,
            AdminName = project.Admin.FirstName,
            UsersNames = project.User_Projects.Select(n => n.User.FirstName),
            IssuesNames = project.Issues.Select(n => n.Summary)
        }).FirstOrDefault();

        return _projectWithNames;
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

    public bool IsProjectMember(int projectId, string Authorization)
    {
        int _userId = JWTService.ParseBearerString(Authorization).UniqueName;

        var _project = _db.Projects.FirstOrDefault(p => p.Id == projectId);
        if (_project == null)
        {
            return false; 
        }
        
        List<int> ProjectMemberIds = _db.Users_Projects.Where(p => p.ProjectId == projectId).Select(p => p.UserId).ToList();
            
        bool projectContainsMember = ProjectMemberIds.Contains<int>(_userId);
        return projectContainsMember;
    }
}
