using LWM.Authentication.DataAccess;
using LWM.Authentication.Dtos;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LWM.Authentication.Authentication.Users
{
    public class UserService(UserManager<DataAccess.User> userManager) : IUserService
    {
        public async Task<bool> AddNewUser(Dtos.User userViewModel)
        {
            var user = new DataAccess.User { UserName = userViewModel.UserName, Email = userViewModel.Email, PersonId = userViewModel.PersonId };

            var result = await userManager.CreateAsync(user, userViewModel.Password);

            return result.Succeeded;
        }
    }
}
