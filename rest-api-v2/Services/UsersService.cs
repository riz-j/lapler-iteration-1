using rest_api_v2.Data;
using rest_api_v2.Models;
using rest_api_v2.Models.DTO;

namespace rest_api_v2.Services;

public class UsersService
{
    private AppDbContext _db;
    public UsersService(AppDbContext db)
    {
        _db = db; 
    }

    public List<User> GetUsers()
    {
        return _db.Users.ToList();
    } 
}
