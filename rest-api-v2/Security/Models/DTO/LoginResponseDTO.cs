using rest_api_v2.Models;

namespace rest_api_v2.Security.Models;

public class LoginResponseDTO
{
    public User User { get; set; }
    public string Token { get; set; }
}
