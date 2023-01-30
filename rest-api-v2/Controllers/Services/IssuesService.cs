using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using rest_api_v2.Data;
using rest_api_v2.Models;
using rest_api_v2.Models.DTO;

namespace rest_api_v2.Controllers.Services;

public class IssuesService : ControllerBase
{  
    private AppDbContext _db;
    public IssuesService(AppDbContext db)
    {
        _db = db; 
    }
    public async Task<Issue> CreateIssueAsync(IssueDTO issueDTO)
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
        await _db.Issues.AddAsync(_issue);
        await _db.SaveChangesAsync();

        return _issue;
    }

    public async Task<List<Issue>> GetAllIssuesAsync()
    {
        var result = await _db.Issues.ToListAsync();
        return result;
    }

    public async Task<List<Issue>> GetIssuesByProjectAsync(int projectId)
    {
        var result = await _db.Issues.Where(i => i.ProjectId == projectId).ToListAsync();
        return result;
    }

    // Need to make ALL endpoints like this: 
    // Do not return ActionResult. Let ActionResult be handled by Controller.
    public async Task<Issue?> GetIssueByIdAsync(int issueId)
    {
        var result = await _db.Issues.FirstOrDefaultAsync(i => i.Id == issueId);
        if (result == null)
        {
            return null;
        }
        
        return result;
    }

    public async Task<Issue?> UpdateIssueAsync(int issueId, IssueDTO issueDTO)
    {
        var _issue = await _db.Issues.FirstOrDefaultAsync(i => i.Id == issueId);

        if (_issue == null)
        {
            return null;
        }

        _issue.TypeOfIssue = issueDTO.TypeOfIssue;
        _issue.PriorityOfIssue = issueDTO.PriorityOfIssue;
        _issue.StatusOfIssue = issueDTO.StatusOfIssue;
        _issue.Summary = issueDTO.Summary;
        _issue.ImageUrl = issueDTO.ImageUrl;
        _issue.DueDate = issueDTO.DueDate;
        _issue.UpdatedAt = DateTime.UtcNow;
        _issue.AssigneeId = issueDTO.AssigneeId;
        _issue.ReporterId = issueDTO.ReporterId;
        
        await _db.SaveChangesAsync();
        return _issue;
    }

    public async Task<Issue?> DeleteIssueAsync(int issueId)
    {
        var _issue = await _db.Issues.FirstOrDefaultAsync(i => i.Id == issueId);
       
        if (_issue == null)
        {
            return null;
        }
        
        _db.Issues.Remove(_issue);
        await _db.SaveChangesAsync();
        return(_issue);
    }

}





        //  _issue.TypeOfIssue = (issueDTO.TypeOfIssue != null) ? issueDTO.TypeOfIssue : _issue.TypeOfIssue;
        // _issue.PriorityOfIssue = (issueDTO.PriorityOfIssue != null) ? issueDTO.PriorityOfIssue : _issue.PriorityOfIssue;
        // _issue.StatusOfIssue = (issueDTO.StatusOfIssue != null) ? issueDTO.StatusOfIssue : _issue.StatusOfIssue;
        // _issue.Summary = (issueDTO.Summary != null) ? issueDTO.Summary : _issue.Summary;
        // _issue.ImageUrl = (issueDTO.ImageUrl != null) ? issueDTO.ImageUrl: _issue.ImageUrl;
        // _issue.DueDate = (issueDTO.DueDate != null) ? issueDTO.DueDate : _issue.DueDate;
        // _issue.UpdatedAt = DateTime.UtcNow;
        // _issue.AssigneeId = (issueDTO.AssigneeId != null) ? issueDTO.AssigneeId : _issue.AssigneeId;
        // _issue.ReporterId = (issueDTO.ReporterId != null) ? issueDTO.ReporterId : _issue.ReporterId;