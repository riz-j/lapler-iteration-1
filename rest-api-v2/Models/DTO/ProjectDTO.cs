using rest_api_v2.Models.DTO;

namespace rest_api_v2.Models;

public class ProjectDTO
{
    public string Name { get; set; }
    public DateTime? CreatedAt { get; set; }
    public string? DisplayPicture { get; set; }

    /* Relations */
    public int AdminId { get; set; }
    public List<int>? UsersIds { get; set; }
    public List<int>? IssuesIds { get; set; }
}

public class ProjectWithNamesDTO
{
    public string Name { get; set; }
    public DateTime? CreatedAt { get; set; }
    public string? DisplayPicture { get; set; }

    /* Relations */
    public string? AdminName { get; set; }
    public IEnumerable<string>? UsersNames { get; set; }
    public IEnumerable<string>? IssuesNames { get; set; }
}

public class ProjectWithIdsNamesAndIssuesDTO
{
    public int Id { get; set; }
    public string Name { get; set; }
    public DateTime? CreatedAt { get; set; }
    public string? DisplayPicture { get; set; }

    /* Relations */
    public int? AdminId { get; set; }
    public IEnumerable<MinimalUserDTO>? Users { get; set; }
    public IEnumerable<IssueWithIdDTO>? Issues { get; set; }
}

public class AddUsersToProjectDTO
{
    public List<int> UserIdsToAdd { get; set; }
}
