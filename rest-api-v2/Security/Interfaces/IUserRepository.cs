using rest_api_v2.Models;
using rest_api_v2.Security.Models;

namespace rest_api_v2.Security.Interfaces;

public interface IUserRepository
{
    bool IsUniqueUser(string email);
    Task<LoginResponseDTO> Login(LoginRequestDTO loginRequestDTO);
    Task<User> Register(RegistrationRequestDTO registrationRequestDTO);
}
