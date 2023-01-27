namespace rest_api_v2.Models;

public class ProjectDTO
{
    public string Name { get; set; }
    public DateTime CreatedAt { get; set; }

    /* Relations */
    public string AdminName { get; set; }
    public List<string> UsersNames { get; set; }
    public List<int> IssuesIds { get; set; }
}