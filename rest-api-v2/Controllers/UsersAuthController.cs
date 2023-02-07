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

        if (_loginResponse.UserWithNamesDTO == null || string.IsNullOrEmpty(_loginResponse.Token))
        {
            return BadRequest(new { message = "Email or password is incorrect" });
        }
        return Ok(_loginResponse);
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody]RegistrationRequestDTO registrationRequestDTO)
    {
        bool _isUserUnique = _userRepository.IsUniqueUser(registrationRequestDTO.Email);
        if (_isUserUnique == false)
        {
            return BadRequest(new { message = "Email is already registered" });
        }

        var _user = await _userRepository.Register(registrationRequestDTO);
        
        if (_user == null)
        {
            return BadRequest();
        }

        return Ok(new { message = "User successfully registered" } );
    }
}
