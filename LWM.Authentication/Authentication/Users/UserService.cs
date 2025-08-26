using LWM.Authentication.Dtos;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace LWM.Authentication.Authentication.Users
{
    public interface IUserService
    {
        Task<bool> AddNewUser(UserModel userModelViewModel);
        Task<IEnumerable<UserModel>> GetUsers();
        Task<UserModel> GetUserByEmail(string email);
        Task ResetPassword(string email, string password);
    }

    public class UserService(UserManager<DataAccess.User> userManager) : IUserService
    {
        public async Task<bool> AddNewUser(UserModel userModelViewModel)
        {
            var user = new DataAccess.User
            {
                UserName = userModelViewModel.UserName, 
                Email = userModelViewModel.Email, 
                PersonId = userModelViewModel.PersonId
            };

            var result = await userManager.CreateAsync(user, userModelViewModel.Password);

            return result.Succeeded;
        }

        public async Task<IEnumerable<UserModel>> GetUsers()
        {
            return await userManager.Users.Select(x => new UserModel
            {
                Email = x.Email,
                UserName = x.UserName
            }).ToListAsync();
        }
        
        public async Task<UserModel> GetUserByEmail(string email)
        {
            var user = await userManager.FindByEmailAsync(email);
            return new UserModel
            {
                Email = user.Email,
                UserName = user.UserName
            };
        }

        public async Task ResetPassword(string email, string password)
        {
            var user = await userManager.FindByEmailAsync(email);
            
            if (user == null)
                return;
            
            var resetToken = await userManager.GeneratePasswordResetTokenAsync(user);
            await userManager.ResetPasswordAsync(user, resetToken, password);
        }
    }
}
