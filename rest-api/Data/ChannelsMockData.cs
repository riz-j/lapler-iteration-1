using rest_api.Models;

namespace rest_api.Data
{
    public class ChannelsMockData
    {   
        public static List<Channel> channelList = new List<Channel>
        {
            new Channel { 
                Id = 1, 
                CreatedAt = DateTime.Now, 
                Users = new List<User> { UsersMockData.userList.First(user => user.Id == 1) }
            },
            new Channel { 
                Id = 2, 
                CreatedAt = DateTime.Now, 
                Users = new List<User> { UsersMockData.userList.First(user => user.Id == 2) }
            } 
        };
    }
}
