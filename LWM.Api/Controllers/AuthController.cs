

using LWM.Authentication.DataAccess;
using LWM.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Security.Claims;
using LWM.Web.ViewModels;
using LWM.Api.Dtos.ViewModels;
namespace LWM.Web.Controllers
{
    [Route("auth")]
    [ApiController]
    public class AuthController(
        UserManager<User> userManager,
        IJwtFactory jwtFactory,
        IOptions<JwtIssuerOptions> jwtOptions) : ControllerBase
    {
        private JwtIssuerOptions _jwtOptions = jwtOptions.Value;

        [HttpPost]
        public async Task<IActionResult> Login(LoginViewModel credentials)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var identity = await GetClaimsIdentity(credentials.Username, credentials.Password);
            if (identity == null)
            {
                return BadRequest("login_failure" + "Invalid Credentials");
            }

            var viewModel = new LoginResponseViewModel
            {
                Token = JTWToken.GenerateToken(
                    identity, jwtFactory, credentials.Username, _jwtOptions).Result
            };

            return Ok(viewModel);
        }

        [HttpPost("users")]
        public async Task<IActionResult> AddNewUser(UserViewModel userViewModel)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var user = new User { UserName = userViewModel.UserName, Email = userViewModel.Email, PersonId = userViewModel.PersonId };

                    var result = await userManager.CreateAsync(user, userViewModel.Password);

                    if (result.Succeeded)
                    {
                        //Now create ApplicationUserRecord

                        return Ok("Account Created");
                    }
                    else { return BadRequest(result); }
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

        private async Task<ClaimsIdentity> GetClaimsIdentity(string userName, string password)
        {
            if (string.IsNullOrEmpty(userName) || string.IsNullOrEmpty(password))
                return await Task.FromResult<ClaimsIdentity>(null);

            // get the user to verifty
            var userToVerify = await userManager.FindByNameAsync(userName);

            if (userToVerify == null) return await Task.FromResult<ClaimsIdentity>(null);

            // check the credentials
            if (await userManager.CheckPasswordAsync(userToVerify, password))
            {
                return await Task.FromResult(jwtFactory.GenerateClaimsIdentity(userName, userToVerify.Id.ToString()));
            }

            // Credentials are invalid, or account doesn't exist
            return await Task.FromResult<ClaimsIdentity>(null);
        }
    }
}