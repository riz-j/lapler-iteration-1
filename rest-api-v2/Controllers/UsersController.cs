using rest_api_v2.Models;
using rest_api_v2.Services;
using Microsoft.AspNetCore.Mvc;
using rest_api_v2.Models.DTO;

namespace rest_api_v2.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private UsersService _usersService;
    public UsersController(UsersService usersService)
    {
        _usersService = usersService;
    }

    [HttpGet]
    public ActionResult<List<User>> GetUsers()
    {
        return _usersService.GetAllUsers();
    }

    [HttpGet("{id:int}")]
    public ActionResult<User> GetUserById(int id)
    {
        return _usersService.GetUserById(id);
    }

    [HttpPost]
    public ActionResult<User> CreateUser([FromBody]UserDTO userDTO)
    {
        return _usersService.CreateUser(userDTO);
    }

    [HttpPut("{id:int}")]
    public ActionResult<User> UpdateUser(int id, UserDTO userDTO)
    {
        return _usersService.UpdateUser(id, userDTO);
    }

    [HttpDelete("{id:int}")]
    public IActionResult DeleteUser(int id)
    {
        return _usersService.DeleteUser(id);
    } 
}
