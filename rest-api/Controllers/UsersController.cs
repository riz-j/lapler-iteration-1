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

        [HttpGet("{id:int}")]
        public ActionResult<User> GetUser(int id) 
        {
            if (id == 0) 
            {
                return BadRequest();
            }

            var result = UsersMockData.userList.FirstOrDefault(user => user.Id == id);

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        [HttpPost]
        public ActionResult<User> CreateUser([FromBody]User _user) 
        {
            if (UsersMockData.userList.FirstOrDefault(user => user.Email == _user.Email) != null)
            {
                return BadRequest();
            }

            if (_user == null) 
            {
                return BadRequest();
            }

            if (_user.Id != 0)
            {
                return BadRequest();
            }

            UsersMockData.userList.Add(_user);
            return _user;
        }

        [HttpPut("{id:int}")]
        public IActionResult UpdateUser(int id, [FromBody]User _user) 
        {
            if (id != _user.Id || _user == null)
            {
                return BadRequest();
            }

            var userToChange = UsersMockData.userList.FirstOrDefault(user => user.Id == id);

            userToChange.Id = _user.Id;
            userToChange.FirstName = _user.FirstName;
            userToChange.LastName = _user.LastName;
            userToChange.Email = _user.Email;
            userToChange.Password = _user.Password;

            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public IActionResult DeleteUser(int id)
        {
            if (id == 0)
            {
                return BadRequest();
            }

            var userToDelete = UsersMockData.userList.FirstOrDefault(user => user.Id == id);
            
            if (userToDelete == null)
            {
                return NotFound();
            }

            UsersMockData.userList.Remove(userToDelete);
            
            return NoContent();
        }

    }
}
