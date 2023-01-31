using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Mvc;
using rest_api_v2.Data;
using rest_api_v2.Models;
using rest_api_v2.Utilities;

namespace rest_api_v2.Security.Services;
    public class JWTService
    {
        public string? GetJWT(string Authorization)
        {
            // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjE4IiwiZW1haWwiOiJhZGlwdXRyYTk3OUBnbWFpbC5jb20iLCJuYmYiOjE2NzUwNjQzMTIsImV4cCI6MTY3NTY2OTExMiwiaWF0IjoxNjc1MDY0MzEyfQ.MwjEuHxEK_MZKjce1bQxPH1v0-SLIRkXF_0f8BUT2-4
            string prefix = "Bearer ";            
            if (!Authorization.StartsWith(prefix))
            {
                return null;
            }
            var Token = Authorization.Substring(prefix.Length);       

            return Token;     
        }

        public JWTClaimsDTO Parse(string token)
        {
            var handler = new JwtSecurityTokenHandler();
            var jsonToken = handler.ReadToken(token);
            var _token = jsonToken as JwtSecurityToken;

            string claimstring_unique_name = _token.Claims.First(claim => claim.Type == "unique_name").ToString();
            string claimstring_email = _token.Claims.First(claim => claim.Type == "email").ToString();
            string claimstring_nbf = _token.Claims.First(claim => claim.Type == "nbf").ToString();
            string claimstring_exp = _token.Claims.First(claim => claim.Type == "exp").ToString();
            string claimstring_iat = _token.Claims.First(claim => claim.Type == "iat").ToString();
            
            int claim_unique_name = Int32.Parse(StringUtil.GetStringAfterFirstSpace(claimstring_unique_name));
            string claim_email = StringUtil.GetStringAfterFirstSpace(claimstring_email);
            int claim_nbf = Int32.Parse(StringUtil.GetStringAfterFirstSpace(claimstring_nbf));
            int claim_exp = Int32.Parse(StringUtil.GetStringAfterFirstSpace(claimstring_exp));
            int claim_iat = Int32.Parse(StringUtil.GetStringAfterFirstSpace(claimstring_iat));

            JWTClaimsDTO _JWTClaimsDTO = new JWTClaimsDTO()
            {
                UniqueName = claim_unique_name,
                Email = claim_email,
                Nbf = claim_nbf,
                Exp = claim_exp,
                Iat = claim_iat
            };
            return _JWTClaimsDTO;
        }
    
        public JWTClaimsDTO ParseBearerString(string Authorization)
        {
            var _JWT = GetJWT(Authorization);
            JWTClaimsDTO _JWTClaimsDTO = Parse(_JWT);

            return _JWTClaimsDTO;
        }
    } 

    

