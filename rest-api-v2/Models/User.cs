namespace rest_api_v2.Models;

public class User
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public DateTime CreatedAt { get; set; }

    /* Relations */ 
    public List<User_Project> User_Projects { get; set; }
    public List<Issue> Issues { get; set; }
}
