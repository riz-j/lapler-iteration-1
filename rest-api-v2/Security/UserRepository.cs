using rest_api_v2.Data;
using rest_api_v2.Models;
using rest_api_v2.Security.Interfaces;
using rest_api_v2.Security.Models;
using rest_api_v2.Services;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Security.Claims;

namespace rest_api_v2.Security;

public class UserRepository : IUserRepository
{
    private AppDbContext _db;
    private string secretKey;
    public UserRepository(AppDbContext db, IConfiguration configuration)
    {
        _db = db;
        secretKey = configuration.GetValue<string>("ApiSettings:Secret");
    }

    public bool IsUniqueUser(string email)
    {
        var _user = _db.Users.FirstOrDefault(u => u.Email == email);

        if (_user == null)
        {
            return true;
        }

        return false;
    }

    public async Task<LoginResponseDTO> Login(LoginRequestDTO loginRequestDTO)
    {
        var _user = _db.Users.FirstOrDefault(u => u.Email.ToLower() == loginRequestDTO.Email.ToLower()
                                            && u.Password == loginRequestDTO.Password);
        
        if (_user == null)
        {
            return new LoginResponseDTO()
            {
                User = null,
                Token = ""
            };
        }

        // If user was found, generate JWT token:
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(secretKey);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Name, _user.Id.ToString()),
                new Claim(ClaimTypes.Email, _user.Email.ToString()),
            }),
            Expires = DateTime.UtcNow.AddDays(7),
            SigningCredentials = new(new SymmetricSecurityKey(key), 
                                     SecurityAlgorithms.HmacSha256Signature)
        };
        
        var _token = tokenHandler.CreateToken(tokenDescriptor);

        LoginResponseDTO loginResponseDTO = new LoginResponseDTO()
        {
            User = _user,
            Token = tokenHandler.WriteToken(_token)
        };
        return loginResponseDTO;
    }

    public async Task<User> Register(RegistrationRequestDTO registrationRequestDTO)
    {
        User _user = new User()
        {
            FirstName = registrationRequestDTO.FirstName,
            LastName = registrationRequestDTO.LastName,
            Email = registrationRequestDTO.Email,
            Password = registrationRequestDTO.Password,
            CreatedAt = DateTime.UtcNow
        };
        _db.Users.Add(_user);
        await _db.SaveChangesAsync();

        _user.Password = "";
        return _user;
    }
}
