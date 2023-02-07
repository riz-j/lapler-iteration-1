namespace rest_api_v2.Models.DTO;

public class UserDTO
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }

    /* Relations */ 
    public List<int>? ProjectId { get; set; }
    public List<int>? AssignedToMeIssueIds { get; set; }
    public List<int>? ReportedByMeIssueIds { get; set; }
}

public class UserWithNamesDTO
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }

    /* Relations */ 
    public Dictionary<int, string> ProjectIdProjectNames { get; set; }
    public List<int> AssignedToMeIssueIds { get; set; }
    public List<int> ReportedByMeIssueIds { get; set; }
}
