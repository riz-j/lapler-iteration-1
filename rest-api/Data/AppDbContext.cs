using Microsoft.EntityFrameworkCore;
using rest_api.Models;

namespace rest_api.Data 
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
            
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Channel> Channels { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder) 
        {
            modelBuilder.Entity<User>().HasData(
                new User { Id=1, FirstName="Johnny", LastName="Gabriel", Email="j-gabriel@gmail.com", Password="somepass123", CreatedAt=DateTime.UtcNow },
                new User { Id=2, FirstName="Kimberly", LastName="Sanchez", Email="kimsan12@gmail.com", Password="thirtytwo32", CreatedAt=DateTime.UtcNow },
                new User { Id=3, FirstName="Kevin", LastName="Lim", Email="kevinlim20@gmail.com", Password="ninetynine99", CreatedAt=DateTime.UtcNow },
                new User { Id=4, FirstName="Hardy", LastName="Emmanuel", Email="hardyem1290@aol.com", Password="fortyfive45", CreatedAt=DateTime.UtcNow },
                new User { Id=5, FirstName="Boyle", LastName="McCaugahee", Email="boylemccaugahee@yahoo.com", Password="twentyfive25", CreatedAt=DateTime.UtcNow }
            );
            modelBuilder.Entity<Channel>().HasData(
                new Channel { 
                    Id = 1, 
                    CreatedAt = DateTime.UtcNow
                    //Users = new List<User> { UsersMockData.userList.First(user => user.Id == 2) }
                },
                new Channel { 
                    Id = 2, 
                    CreatedAt = DateTime.UtcNow
                    //Users = new List<User> { UsersMockData.userList.First(user => user.Id == 1) }
                } 
            );
            modelBuilder.Entity<ChannelUser>().HasData(
                new ChannelUser { Id = 1, ChannelsId = 1, UsersId = 2 },
                new ChannelUser { Id = 2, ChannelsId = 2, UsersId = 1 }
            );
        }
    }
}
