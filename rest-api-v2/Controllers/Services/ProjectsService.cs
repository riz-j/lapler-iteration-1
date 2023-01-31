using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

    public async Task<Project> CreateProjectAsync(ProjectDTO projectDTO, int creatorId)
    {
        var _project = new Project()
        {
            Name = projectDTO.Name,
            CreatedAt = DateTime.UtcNow,
            AdminId = creatorId
        };
        await _db.Projects.AddAsync(_project);
        await _db.SaveChangesAsync();
        
        return _project;
    }
    
    public async Task AddUsersToProjectAsync(int projectId, List<int> UserIdsToAdd)
    {
        var _project = await _db.Projects.FirstOrDefaultAsync(p => p.Id == projectId);
        if (_project == null)
        {
            throw new Exception("Project Not Found");
        }

        foreach (var id in UserIdsToAdd)
        {
                var _user = _db.Users.FirstOrDefault(u => u.Id == id);
                if (_user == null)
                {
                    throw new Exception($"User with Id: {id} does not exist");
                }
                
                var _user_project = new User_Project()
                {
                    UserId = id,
                    ProjectId = _project.Id
                };      
                await _db.Users_Projects.AddAsync(_user_project);
        }
        await _db.SaveChangesAsync();
        return;    
    }

    public async Task<ProjectWithNamesDTO?> GetProjectWithNamesAsync(int projectId)
    {
        var _project = await _db.Projects.FirstOrDefaultAsync(p => p.Id == projectId);
        
        if (_project == null)
        {
            return null;
        }

        var _projectWithNames = await _db.Projects.Where(p => p.Id == projectId).Select(project => new ProjectWithNamesDTO {
            Name = _project.Name,
            CreatedAt = project.CreatedAt,
            AdminName = project.Admin.FirstName,
            UsersNames = project.User_Projects.Select(n => n.User.FirstName),
            IssuesNames = project.Issues.Select(n => n.Summary)
        }).FirstOrDefaultAsync();

        return _projectWithNames;
    }

    public async Task<Project?> UpdateProjectAsync(int projectId, ProjectDTO projectDTO)
    {
        var _project = await _db.Projects.FirstOrDefaultAsync(p => p.Id == projectId);
        
        if (_project == null)
        {
            return null;
        }

        _project.Name = projectDTO.Name;
        _project.AdminId = projectDTO.AdminId;
        await _db.SaveChangesAsync();

        return _project;
    }

    public async Task DeleteProjectAsync(int projectId)
    {
        var _project = await _db.Projects.FirstOrDefaultAsync(p => p.Id == projectId);
        
        if (_project == null)
        {
            throw new Exception("Project Not Found");
        }

        _db.Projects.Remove(_project);
        await _db.SaveChangesAsync();
        return;
    }
}
