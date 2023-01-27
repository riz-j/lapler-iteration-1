namespace rest_api_v2.Models;

public class Project
{
    public int Id { get; set; }
    public string Name { get; set; }
    public DateTime CreatedAt { get; set; }

    /* Relations */
    public int AdminId { get; set; }
    public User Admin { get; set; }
    public List<User_Project> User_Projects { get; set; }
    public List<Issue> Issues { get; set; }
}
