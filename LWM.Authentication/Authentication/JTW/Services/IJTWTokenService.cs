using System.Security.Claims;

namespace LWM.Authentication
{
    public interface IJTWTokenService
    {
        Task<JTWResponseToken> GenerateToken(ClaimsIdentity claimsIdentity, string userName, JwtIssuerOptions jwtIssuerOptions);
    }
}