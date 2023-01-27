using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace rest_api.Models
{
    public class ChannelUser
    {
        [Key]
        public int Id { get; set; }
        
        [ForeignKey("Channel")]
        public int ChannelsId { get; set; }
        public Channel Channel { get; set; }

        [ForeignKey("User")]
        public int UsersId { get; set; }
        public User User { get; set; }
    }
}

