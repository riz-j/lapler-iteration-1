using rest_api.Models;

namespace rest_api;

public class Issue
{
    public int Id { get; set; }
    public string TypeOfIssue { get; set; }
    public string PriorityOfIssue { get; set; }
    public string Summary { get; set; }
    public string StatusOfIssue { get; set; }
    public DateTime DueDate { get; set; }
    public User Assignee { get; set; }
    public User Reporter { get; set; }
    public Channel Channel { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}
