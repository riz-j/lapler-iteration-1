using Microsoft.AspNetCore.Mvc;
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

    public ActionResult<List<Issue>> GetAllIssues()
    {
        return Ok(_db.Issues.ToList());
    }

    public ActionResult<List<Issue>> GetIssuesByProject(int projectId)
    {
        return Ok(_db.Issues.Where(i => i.ProjectId == projectId));
    }

    public ActionResult<Issue> UpdateIssue(int id, IssueDTO issueDTO)
    {
        var _issue = _db.Issues.FirstOrDefault(i => i.Id == id);

        if (_issue == null)
        {
            return BadRequest();
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
        
        _db.SaveChanges();
        return Ok(_issue);
    }

    public IActionResult DeleteIssue(int id)
    {
        var _issue = _db.Issues.FirstOrDefault(i => i.Id == id);
       
        if (_issue == null)
        {
            return NotFound();
        }
        
        _db.Issues.Remove(_issue);
        return Ok();
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