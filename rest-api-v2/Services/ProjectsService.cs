using rest_api_v2.Data;
using rest_api_v2.Models;

namespace rest_api_v2.Services;

public class ProjectsService
{
    private AppDbContext _db;
    public ProjectsService(AppDbContext db)
    {
        _db = db;
    }

    public void CreateProject(ProjectDTO projectDTO)
    {
        var _project = new Project()
        {
            Name = projectDTO.Name,
            CreatedAt = DateTime.UtcNow,
            AdminId = projectDTO.AdminId
        };
        _db.Projects.Add(_project);
        _db.SaveChanges();
    }

    public void AddUsersToProject(int projectId, AddUsersToProjectDTO addUsersToProjectDTO)
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
        }
    }
}
