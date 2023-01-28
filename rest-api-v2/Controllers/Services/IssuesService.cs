using Microsoft.AspNetCore.Mvc;
using rest_api_v2.Data;
using rest_api_v2.Models;
using rest_api_v2.Models.DTO;

namespace rest_api_v2.Services;

public class IssuesService : ControllerBase
{  
    private AppDbContext _db;
    public IssuesService(AppDbContext db)
    {
        _db = db; 
    }
    public ActionResult<Issue> CreateIssue(IssueDTO issueDTO)
    {
        var _issue = new Issue() 
        {
            TypeOfIssue = issueDTO.TypeOfIssue,
            PriorityOfIssue = issueDTO.PriorityOfIssue, 
            StatusOfIssue = issueDTO.StatusOfIssue,
            Summary = issueDTO.Summary,
            ImageUrl = (issueDTO.ImageUrl != null) ? issueDTO.ImageUrl : null, 
            DueDate = (issueDTO.DueDate != null) ? issueDTO.DueDate : null, 
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,
            ProjectId = issueDTO.ProjectId,
            AssigneeId = (issueDTO.AssigneeId != null) ? issueDTO.AssigneeId : null,
            ReporterId = issueDTO.ReporterId
        };
        _db.Issues.Add(_issue);
        _db.SaveChanges();

        return Ok(_issue);
    }

    public ActionResult<List<User>> GetAllIssues()
    {
        return Ok(_db.Users.ToList());
    }
}
