

using LWM.Authentication;
using Microsoft.AspNetCore.Mvc;
using LWM.Web.ViewModels;
using LWM.Api.Dtos.ViewModels;
using LWM.Authentication.Authentication.Users;
using LWM.Authentication.Authentication.Login;
namespace LWM.Web.Controllers
{
    [Route("auth")]
    [ApiController]
    public class AuthController(
        IUserService userService,
        ILoginService loginService) : ControllerBase
    {

        [HttpPost]
        public async Task<IActionResult> Login(LoginViewModel credentials)
        {
            var loginAttempt = await loginService.AttemptLogin(
                new Authentication.Dtos.LoginRequest { Password = credentials.Password, Username = credentials.Username });

            if (!loginAttempt.IsSuccss)
            { 
                return BadRequest(ModelState);
            }

            var viewModel = new LoginResponseViewModel
            {
                Token = new JTWResponseToken
                {
                    Auth_Token = loginAttempt.Token
                }
            };

            return Ok(viewModel);
        }

        [HttpPost("users")]
        public async Task<IActionResult> AddNewUser(UserViewModel userViewModel)
        {
            try
            {
                if (await userService.AddNewUser(new Authentication.Dtos.User 
                    { 
                        Email = userViewModel.Email, 
                        Password = userViewModel.Password,
                        PersonId = userViewModel.PersonId,
                        UserName = userViewModel.UserName
                    }))
                {
                    return Ok("Account Created");
                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.InnerException);
            }
        }
    }
}