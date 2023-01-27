using rest_api_v2.Models;
using rest_api_v2.Services;
using Microsoft.AspNetCore.Mvc;

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
        return Ok(_usersService.GetUsers());
    }
}
