using Microsoft.AspNetCore.Mvc;
using rest_api_v2.Controllers.Services;
using rest_api_v2.Data;
using rest_api_v2.Models;

namespace rest_api_v2.Controllers;

[ApiController]
[Route("api/[controller]")]
public class IssuesController : ControllerBase
{
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

    [HttpPut("{id:int}")]
    public ActionResult<Issue> UpdateIssue(int id, [FromBody]IssueDTO issueDTO)
    {
        return _issuesService.UpdateIssue(id, issueDTO);   
    }

    [HttpDelete("{id:int}")]
    public IActionResult DeleteIssue(int id)
    {
        return _issuesService.DeleteIssue(id);
    }
}
