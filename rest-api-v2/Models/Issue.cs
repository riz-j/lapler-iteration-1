namespace rest_api_v2.Models;

public class Issue
{
    public int Id { get; set; }
    public string TypeOfIssue { get; set; }
    public string PriorityOfIssue { get; set; }
    public string StatusOfIssue { get; set; }
    public string Summary { get; set; }
    public string? ImageUrl { get; set; }
    public DateTime? DueDate { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    /* Relations */
    public int ProjectId { get; set; }
    public Project Project { get; set; }
    public int? AssigneeId { get; set; }
    public User? Assignee { get; set; }
    public int ReporterId { get; set; }
    public User Reporter { get; set; }
}
