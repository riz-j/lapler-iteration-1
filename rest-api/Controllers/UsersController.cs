using Microsoft.AspNetCore.Mvc;
using rest_api.Data;
using rest_api.Models;

namespace rest_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        [HttpGet]
        public ActionResult<List<User>> GetUsers() 
        {
            return Ok(UsersMockData.userList);
        } 
    }
}
