using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace rest_api_v2.Models;

public class User_Project
{
    public int ProjectId { get; set; }
    public Project Project { get; set; }
    public int UserId { get; set; }
    public User User { get; set; }
}
