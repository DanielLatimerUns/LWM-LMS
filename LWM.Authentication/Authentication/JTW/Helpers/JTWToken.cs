using System.Security.Claims;

namespace LWM.Authentication
{
    public class JTWToken
    {
        public async static Task<JTWResponseToken> GenerateToken(
            ClaimsIdentity claimsIdentity, 
            IJwtFactory IJwtFactory, 
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
