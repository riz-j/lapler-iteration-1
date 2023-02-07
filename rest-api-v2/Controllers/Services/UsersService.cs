using Microsoft.AspNetCore.Mvc;
using rest_api_v2.Data;
using rest_api_v2.Models;
using rest_api_v2.Models.DTO;

namespace rest_api_v2.Controllers.Services;

public class UsersService : ControllerBase
{
    private AppDbContext _db;
    public UsersService(AppDbContext db)
    {
        _db = db; 
    }

    public ActionResult<User> CreateUser(UserDTO userDTO)
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

        return Ok(_user);
    }
    public ActionResult<List<User>> GetAllUsers()
    {
        return Ok(_db.Users.ToList());
    } 

    public ActionResult<UserDTO> GetUserById(int id)
    {
        var _user = _db.Users.FirstOrDefault(n => n.Id == id);
        if (_user == null)
        {
            return NotFound();
        }

        var _userDTO = new UserDTO 
        {
            FirstName = _user.FirstName,
            LastName = _user.LastName,
            Email = _user.Email,
            Password = _user.Password
        };
        _userDTO.ProjectId = _db.Users_Projects.Where(up => up.UserId == id)
                            .Select(up => up.ProjectId).ToList();

        return Ok(_userDTO);
    }

    public ActionResult<User> UpdateUser(int userId, UserDTO userDTO)
    {
        var _user = _db.Users.FirstOrDefault(u => u.Id == userId);
        
        if (_user == null)
        {
            return NotFound();
        }

        _user.FirstName = userDTO.FirstName;
        _user.LastName = userDTO.LastName;
        _user.Email = userDTO.Email;
        _user.Password = userDTO.Password;
        _db.SaveChanges();

        return Ok(_user);
    }

    public IActionResult DeleteUser(int userId)
    {
        var _user = _db.Users.FirstOrDefault(u => u.Id == userId);
        
        if (_user == null)
        {
            return NotFound();
        }

        _db.Users.Remove(_user);
        _db.SaveChanges();

        return Ok();
    }
}
