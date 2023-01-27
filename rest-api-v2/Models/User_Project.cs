namespace rest_api_v2.Models;

public class User_Project
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public User User { get; set; }
    public int ProjectId { get; set; }
    public Project Project { get; set; }
}
