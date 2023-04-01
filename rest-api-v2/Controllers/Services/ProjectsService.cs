using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using rest_api_v2.Data;
using rest_api_v2.Models;
using rest_api_v2.Models.DTO;
using rest_api_v2.Security.Services;

namespace rest_api_v2.Controllers.Services;

public class ProjectsService : ControllerBase
{
    private AppDbContext _db;
    private IssuesService _issuesService;
    public ProjectsService(AppDbContext db, IssuesService issuesService)
    {
        _db = db;
        _issuesService = issuesService;
    }

    public async Task<Project> CreateProjectAsync(ProjectDTO projectDTO, int creatorId)
    {
        var _project = new Project()
        {
            Name = projectDTO.Name,
            CreatedAt = DateTime.UtcNow,
            DisplayPicture = projectDTO.DisplayPicture,
            AdminId = creatorId
        };
        await _db.Projects.AddAsync(_project);
        await _db.SaveChangesAsync();

        return _project;
    }

    public async Task AddUsersToProjectByIdAsync(int projectId, List<int> UserIdsToAdd)
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

    public async Task AddUsersToProjectByEmailAsync(int projectId, List<string> UserEmailsToAdd)
    {
        var _project = await _db.Projects.FirstOrDefaultAsync(p => p.Id == projectId);
        if (_project == null)
        {
            throw new Exception("Project Not Found");
        }

        foreach (var email in UserEmailsToAdd)
        {
            var _user = _db.Users.FirstOrDefault(u => u.Email == email);
            if (_user == null)
            {
                throw new Exception($"User with Email: {email} does not exist");
            }

            var _user_project = new User_Project()
            {
                UserId = _user.Id,
                ProjectId = _project.Id
            };
            await _db.Users_Projects.AddAsync(_user_project);
        }
        await _db.SaveChangesAsync();
        return;
    }

    public async Task RemoveUserFromProjectAsync(int projectId, int userIdToRemove)
    {
        var _user_project = _db.Users_Projects.Where(up => (up.UserId == userIdToRemove) && (up.ProjectId == projectId)).FirstOrDefault();
        if (_user_project == null)
        {
            throw new Exception($"User-Project Relationship Not Found");
        }

        _db.Users_Projects.Remove(_user_project);
        await _db.SaveChangesAsync();
        return;
    }

    public async Task<ProjectWithIdsNamesAndIssuesDTO?> GetProjectWithNamesAsync(int projectId)
    {
        var _project = await _db.Projects.FirstOrDefaultAsync(p => p.Id == projectId);

        if (_project == null)
        {
            return null;
        }

        var _issues = await _db.Issues.Where(i => i.ProjectId == projectId).Select(issue => new IssueWithIdDTO
        {
            Id = issue.Id,
            TypeOfIssue = issue.TypeOfIssue,
            PriorityOfIssue = issue.PriorityOfIssue,
            StatusOfIssue = issue.StatusOfIssue,
            Summary = issue.Summary,
            ImageUrl = issue.ImageUrl,
            DueDate = issue.DueDate,
            CreatedAt = issue.CreatedAt,
            UpdatedAt = issue.UpdatedAt,
            ProjectId = issue.ProjectId,
            AssigneeId = issue.AssigneeId,
            ReporterId = issue.ReporterId
        }).ToListAsync();

        var _projectWithNames = await _db.Projects.Where(p => p.Id == projectId).Select(project => new ProjectWithIdsNamesAndIssuesDTO
        {
            Name = _project.Name,
            CreatedAt = project.CreatedAt,
            DisplayPicture = _project.DisplayPicture,
            AdminName = project.Admin.FirstName,
            Users = project.User_Projects.Select(n => new MinimalUserDTO
            {
                Id = n.User.Id,
                FirstName = n.User.FirstName,
                LastName = n.User.LastName,
                Email = n.User.Email
            }),
            Issues = _issues
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
        _project.DisplayPicture = projectDTO.DisplayPicture;
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
