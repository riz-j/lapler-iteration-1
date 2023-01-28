using Microsoft.AspNetCore.Mvc;
using rest_api_v2.Data;
using rest_api_v2.Models;
using rest_api_v2.Services;

namespace rest_api_v2.Controllers;

[ApiController]
[Route("api/[controller]")]
public class IssuesController : ControllerBase
{
    // private AppDbContext _db;
    // public IssuesController(AppDbContext db)
    // {
    //     _db = db;
    // }

    // [HttpGet]
    // public ActionResult<List<User>> GetUsers()
    // {
    //     return Ok(_db.Issues.ToList());
    // }

    // [HttpGet("{id:int}")]
    // public ActionResult<List<User>> GetIssue(int id)
    // {
    //     return Ok(_db.Issues.Where(i => i.ProjectId == id));
    // }


    private IssuesService _issuesService;
    public IssuesController(IssuesService issuesService)
    {
        _issuesService = issuesService;
    }

    [HttpPost]
    public ActionResult<Issue> CreateIssue([FromBody]IssueDTO issueDTO)
    {
        return _issuesService.CreateIssue(issueDTO);
    }

    [HttpGet]
    public ActionResult<List<Issue>> GetIssues()
    {
        return _issuesService.GetAllIssues();
    }

    [HttpGet("{id:int}")]
    public ActionResult<List<Issue>> GetIssuesByProject(int id)
    {
        return _issuesService.GetIssuesByProject(id);
    }
}
