namespace rest_api.Models
{
    public class Channel 
    {
        public int Id { get; set; }
        public ICollection<User> Users { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}