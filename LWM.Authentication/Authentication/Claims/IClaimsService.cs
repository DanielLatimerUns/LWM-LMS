using System.Security.Claims;

namespace LWM.Authentication.Authentication.Claims
{
    public interface IClaimsService
    {
        Task<ClaimsIdentity> GetClaimsIdentity(string userName, string password);
    }
}