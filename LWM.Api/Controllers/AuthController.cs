using LWM.Api.Dtos.ViewModels;
using LWM.Authentication;
using LWM.Authentication.Authentication.Login;
using Microsoft.AspNetCore.Mvc;

namespace LWM.Api.Controllers
{
    [Route("auth")]
    [ApiController]
    public class AuthController(
        ILoginService loginService) : ControllerBase
    {

        [HttpPost]
        public async Task<IActionResult> Login(LoginViewModel credentials)
        {
            var response = await loginService.AttemptLogin(
                new Authentication.Dtos.LoginRequest
                    { Password = credentials.Password, Username = credentials.Username });

            if (!response.IsSuccss)
            {
                return BadRequest(ModelState);
            }

            var viewModel = new LoginResponseViewModel
            {
                Token = new JTWResponseToken
                {
                    Auth_Token = response.Token,
                },
                User = response.UserModel,
            };

            return Ok(viewModel);
        }
    }
}