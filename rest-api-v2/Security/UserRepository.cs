using rest_api_v2.Data;
using rest_api_v2.Models;
using rest_api_v2.Security.Interfaces;
using rest_api_v2.Security.Models;
using rest_api_v2.Services;

namespace rest_api_v2.Security;

public class UserRepository : IUserRepository
{
    private AppDbContext _db;
    public UserRepository(AppDbContext db)
    {
        _db = db;
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
        throw new NotImplementedException();
    }

    public async Task<User> Register(RegistrationRequestDTO registrationRequestDTO)
    {
        User _user = new User()
        {
            FirstName = registrationRequestDTO.FirstName,
            LastName = registrationRequestDTO.LastName,
            Email = registrationRequestDTO.Email,
            Password = registrationRequestDTO.Password
        };
        _db.Users.Add(_user);
        await _db.SaveChangesAsync();

        _user.Password = "";
        return _user;
    }
}
