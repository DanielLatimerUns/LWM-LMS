using LWM.Authentication.Authentication.Claims;
using LWM.Authentication.Dtos;
using Microsoft.Extensions.Options;

namespace LWM.Authentication.Authentication.Login
{
    public class LoginService(
        IClaimsService claimsService,
        IJTWTokenService jTWTokenService,
        IOptions<JwtIssuerOptions> jwtOptions

        ) : ILoginService
    {
        public async Task<LoginResponse> AttemptLogin(LoginRequest loginRequest)
        {
            var identity = await claimsService.GetClaimsIdentity(loginRequest.Username, loginRequest.Password);
            if (identity == null)
            {
                return new LoginResponse { IsSuccss = false };
            }

            var token = await jTWTokenService.GenerateToken(
                    identity, loginRequest.Username, jwtOptions.Value);

            var response = new LoginResponse
            {
                Token = token.Auth_Token,
                IsSuccss = true,
            };

            return response;
        }
    }
}
