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
        return Ok(_usersService.GetAllUsers());
    }

    [HttpGet("{id:int}")]
    public ActionResult<List<User>> GetUserById(int id)
    {
        return Ok(_usersService.GetUserById(id));
    }

    [HttpPost]
    public IActionResult CreateUser([FromBody]UserDTO userDTO)
    {
        _usersService.CreateUser(userDTO);
        return Ok();
    }

    [HttpPut("{id:int}")]
    public ActionResult<User> UpdateUser(int id, UserDTO userDTO)
    {
        return Ok(_usersService.UpdateUser(id, userDTO));
    }

    [HttpDelete("{id:int}")]
    public IActionResult DeleteUser(int id)
    {
        _usersService.DeleteUser(id);
        return Ok();
    } 
}
