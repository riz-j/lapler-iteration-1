namespace rest_api_v2.Models.DTO;

public class UserDTO
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }

    /* Relations */ 
    public List<string> ProjectNames { get; set; }
    public List<int> IssueIds { get; set; }
}
