using rest_api_v2.Models;
using rest_api_v2.Models.DTO;

namespace rest_api_v2.Security.Models;

public class LoginResponseDTO
{
    public UserWithNamesDTO UserWithNamesDTO { get; set; }
    public string Token { get; set; }
}
