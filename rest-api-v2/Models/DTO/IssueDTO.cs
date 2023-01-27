namespace rest_api_v2.Models;

public class IssueDTO
{
    public string TypeOfIssue { get; set; }
    public string PriorityOfIssue { get; set; }
    public string StatusOfIssue { get; set; }
    public string Summary { get; set; }
    public string ImageUrl { get; set; }
    public DateTime DueDate { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    /* Relations */
    public string ProjectName { get; set; }
    public string AssigneeName { get; set; }
    public string ReporterName { get; set; }
}
