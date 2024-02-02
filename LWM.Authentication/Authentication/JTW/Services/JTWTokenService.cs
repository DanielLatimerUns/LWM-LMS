using System.Security.Claims;

namespace LWM.Authentication
{
    public class JTWTokenService(
        IJwtFactory IJwtFactory) : IJTWTokenService
    {
        public async Task<JTWResponseToken> GenerateToken(
            ClaimsIdentity claimsIdentity,
            string userName,
            JwtIssuerOptions jwtIssuerOptions)
        {
            var reponse = new JTWResponseToken();

            reponse.ID = claimsIdentity.Claims.Single(c => c.Type == "id").Value;
            reponse.Auth_Token = await IJwtFactory.GenerateEncodedToken(userName, claimsIdentity);
            reponse.Expires_In = (int)jwtIssuerOptions.ValidFor.TotalSeconds;

            return reponse;
        }
    }
}
