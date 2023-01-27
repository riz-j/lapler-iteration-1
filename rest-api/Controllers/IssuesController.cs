using Microsoft.AspNetCore.Mvc;
using rest_api.Data;
using rest_api.Models;

namespace rest_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class IssuesController : ControllerBase
    {
        [HttpGet]
        public ActionResult<List<User>> GetIssues() 
        {
            return Ok(IssuesMockData.issuesList);
        } 

        [HttpGet("{id:int}")]
        public ActionResult<Issue> GetIssue(int id) 
        {
            if (id == 0) 
            {
                return BadRequest();
            }

            var result = IssuesMockData.issuesList.FirstOrDefault(issue => issue.Id == id);

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        [HttpPost]
        public ActionResult<Issue> CreateIssue([FromBody]Issue _issue) 
        {
            if (_issue == null) 
            {
                return BadRequest();
            }

            if (_issue.Id != 0)
            {
                return BadRequest();
            }

            IssuesMockData.issuesList.Add(_issue);
            return _issue;
        }

        [HttpPut("{id:int}")]
        public IActionResult UpdateIssue(int id, [FromBody]Issue _issue) 
        {
            if (id != _issue.Id || _issue == null)
            {
                return BadRequest();
            }

            var issueToChange = IssuesMockData.issuesList.FirstOrDefault(issue => issue.Id == id);

            issueToChange.Id = _issue.Id;
            issueToChange.TypeOfIssue = _issue.TypeOfIssue;
            issueToChange.PriorityOfIssue = _issue.PriorityOfIssue;
            issueToChange.Summary = _issue.Summary;
            issueToChange.StatusOfIssue = _issue.StatusOfIssue;
            issueToChange.DueDate = _issue.DueDate;
            issueToChange.Assignee = _issue.Assignee;
            issueToChange.Reporter = _issue.Reporter;
            issueToChange.Channel = _issue.Channel;
            issueToChange.CreatedAt = _issue.CreatedAt;
            issueToChange.UpdatedAt = _issue.UpdatedAt;

            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public IActionResult DeleteIssue(int id)
        {
            if (id == 0)
            {
                return BadRequest();
            }

            var issueToDelete = IssuesMockData.issuesList.FirstOrDefault(issue => issue.Id == id);
            
            if (issueToDelete == null)
            {
                return NotFound();
            }

            IssuesMockData.issuesList.Remove(issueToDelete);
            
            return NoContent();
        }

    }
}
