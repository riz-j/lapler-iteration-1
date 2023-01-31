using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using rest_api_v2.Controllers.Services;
using rest_api_v2.Data;
using rest_api_v2.Models;
using rest_api_v2.Security.Services;

namespace rest_api_v2.Controllers;

/*********************************

    Need to add Project ID as URL parameter

*********************************/


[ApiController]
[Route("api/[controller]")]
public class IssuesController : ControllerBase
{
    private IssuesService _issuesService;
    private AuthService _authService;
    private JWTService _JWTService;
    public IssuesController(IssuesService issuesService, AuthService authService, JWTService JWTService)
    {
        _issuesService = issuesService;
        _authService = authService;
        _JWTService = JWTService;
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<Issue>> CreateIssueAsync([FromBody] IssueDTO issueDTO, [FromHeader]string Authorization)
    {
        int _projectId = issueDTO.ProjectId;
        if (!_authService.IsProjectMember(_projectId, Authorization))
        {
            return Forbid();
        }

        int reporterId = _JWTService.ParseBearerString(Authorization).UniqueName;

        var _issue = await _issuesService.CreateIssueAsync(issueDTO, reporterId);
        return Ok(_issue);
    }

    // Only for Superuser
    [HttpGet]
    public async Task<ActionResult<List<Issue>>> GetIssues()
    {
        var result = await _issuesService.GetAllIssuesAsync();
        return Ok(result);
    }

    [Authorize]
    [HttpGet("{projectId:int}")]
    public async Task<ActionResult<List<Issue>>> GetIssuesByProject(int projectId, [FromHeader]string Authorization)
    {
        if (!_authService.IsProjectMember(projectId, Authorization))
        {
            return Forbid();
        }

        var result = await _issuesService.GetIssuesByProjectAsync(projectId);
        return Ok(result);
    }

    [Authorize]
    [HttpPut("{issueId:int}")]
    public async Task<ActionResult<Issue>> UpdateIssue(int issueId, [FromBody]IssueDTO issueDTO, [FromHeader]string Authorization)
    {
        if (!_authService.IsProjectMember(issueDTO.ProjectId, Authorization))
        {
            return Forbid();
        }

        var result = await _issuesService.UpdateIssueAsync(issueId, issueDTO);
        return Ok(result);   
    }

    /* 
    Need to make all endpoints in this controller take a {projectId:int} parameter 
    */
    [Authorize]
    [HttpDelete("project/{projectId:int}/issue/{issueId:int}")]
    public async Task<ActionResult<Issue>> DeleteIssueAsync(int projectId, int issueId, [FromHeader]string Authorization)
    {
        if (!_authService.IsProjectMember(projectId, Authorization))
        {
            return Forbid();
        }

        var result = await _issuesService.DeleteIssueAsync(issueId);
        if (result == null)
        {
            return NotFound();
        }
        
        return Ok(result);
    }
}
