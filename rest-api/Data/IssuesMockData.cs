using rest_api.Models;

namespace rest_api.Data
{
    public class IssuesMockData
    {   
        public static List<Issue> issuesList = new List<Issue>
        {
            new Issue { 
                Id = 1,
                TypeOfIssue = "Bug",
                PriorityOfIssue = "Medium",
                Summary = "This issue is causing nice",
                StatusOfIssue = "Waiting",
                DueDate = new DateTime(2023, 01, 02),
                Assignee = UsersMockData.userList.First(user => user.Id == 1), 
                Reporter = UsersMockData.userList.First(user => user.Id == 2),
                Channel = ChannelsMockData.channelList.First(user => user.Id == 1),
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now
            }
        };
    }
}
