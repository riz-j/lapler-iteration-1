using Microsoft.AspNetCore.Mvc;
using rest_api_v2.Security.Interfaces;
using rest_api_v2.Security.Models;

namespace rest_api_v2;

[ApiController]
[Route("api/[controller]")]
public class UsersAuthController : ControllerBase
{
    private readonly IUserRepository _userRepository;
    public UsersAuthController(IUserRepository userRepository)
    {
        _userRepository = userRepository;   
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody]LoginRequestDTO loginRequestDTO)
    {
        var _loginResponse = await _userRepository.Login(loginRequestDTO);

        if (_loginResponse.User == null || string.IsNullOrEmpty(_loginResponse.Token))
        {
            return BadRequest(new { message = "Email or password is incorrect" });
        }
        return Ok(_loginResponse);
    }
}
