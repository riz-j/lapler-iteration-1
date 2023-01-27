using Microsoft.EntityFrameworkCore;
using rest_api_v2.Models;

namespace rest_api_v2.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User_Project>()
                .HasOne(b => b.User)
                .WithMany(ba => ba.User_Projects)
                .HasForeignKey(bi => bi.UserId);

        modelBuilder.Entity<User_Project>()
                .HasOne(b => b.Project)
                .WithMany(ba => ba.User_Projects)
                .HasForeignKey(bi => bi.ProjectId);
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Project> Projects { get; set; }
    public DbSet<User_Project> Users_Projects { get; set; }
    public DbSet<Issue> Issues { get; set; }
}
