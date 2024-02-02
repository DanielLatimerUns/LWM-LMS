using LWM.Authentication.Dtos;

namespace LWM.Authentication.Authentication.Login
{
    public interface ILoginService
    {
        Task<LoginResponse> AttemptLogin(LoginRequest loginRequest);
    }
}