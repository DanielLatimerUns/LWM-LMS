using LWM.Api.Dtos.ViewModels;
using LWM.Authentication.Authentication.Users;
using Microsoft.AspNetCore.Mvc;

namespace LWM.Api.Controllers
{
    [Route("user")]
    [ApiController]
    public class UserController(IUserService userService) : ControllerBase
    {
        
        [HttpPost]
        public async Task<IActionResult> AddNewUser(UserViewModel userViewModel)
        {
            if (await userService.AddNewUser(new Authentication.Dtos.UserModel
                {
                    Email = userViewModel.Email,
                    Password = userViewModel.Password,
                    PersonId = userViewModel.PersonId,
                    UserName = userViewModel.UserName
                }))
            {
                return Ok();
            }
            
            return BadRequest();
        }
        
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            return Ok(await userService.GetUsers());
        }

        [HttpPost("resetpassword")]
        public async Task<IActionResult> ResetPassword(UserViewModel userViewModel)
        {
            await userService.ResetPassword(userViewModel.Email, userViewModel.Password);
            return Ok();
        }
    }
}