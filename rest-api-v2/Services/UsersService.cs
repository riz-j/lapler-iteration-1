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

    public void CreateUser(UserDTO userDTO)
    {
        var _user = new User()
        {
            FirstName = userDTO.FirstName,
            LastName = userDTO.LastName,
            Email = userDTO.Email,
            Password = userDTO.Password,
            CreatedAt = DateTime.UtcNow
        };
        _db.Users.Add(_user);
        _db.SaveChanges();
    }
    public List<User> GetAllUsers()
    {
        return _db.Users.ToList();
    } 

    public User GetUserById(int id)
    {
        return _db.Users.FirstOrDefault(n => n.Id == id);
    }

    public User UpdateUser(int userId, UserDTO userDTO)
    {
        var _user = _db.Users.FirstOrDefault(u => u.Id == userId);
        if (_user != null)
        {
            _user.FirstName = userDTO.FirstName;
            _user.LastName = userDTO.LastName;
            _user.Email = userDTO.Email;
            _user.Password = userDTO.Password;

            _db.SaveChanges();
        }
        return _user;
    }

    public void DeleteUser(int userId)
    {
        var _user = _db.Users.FirstOrDefault(u => u.Id == userId);
        if (_user != null)
        {
            _db.Users.Remove(_user);
            _db.SaveChanges();
        }
    }
}
