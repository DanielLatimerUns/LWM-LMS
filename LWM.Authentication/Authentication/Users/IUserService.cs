using LWM.Authentication.Dtos;

namespace LWM.Authentication.Authentication.Users
{
    public interface IUserService
    {
        Task<bool> AddNewUser(User userViewModel);
    }
}