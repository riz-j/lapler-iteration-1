using System.ComponentModel.DataAnnotations;

namespace rest_api_v2.Models;

public class JWTClaimsDTO
{
    public int UniqueName { get; set; }
    public string? Email { get; set; }
    public int? Nbf { get; set; }
    public int? Exp { get; set; }
    public int? Iat { get; set; }
}
