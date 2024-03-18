using LWM.Api.ApplicationServices.Azure.Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LWM.Api.Controllers
{
    [ApiController]
    [Route("azure")]
    public class AzureController(
        IAzureConsentService azureConsentService, 
        IAzureLessonImportService azureLessonImportService,
        IAzureAuthenticationService azureAuthenticationService,
        IWebHostEnvironment webHostEnvironment) : Controller
    {
        [HttpPut]
        [Authorize]
        [Route("import")]
        public async Task Import()
        {
           await azureLessonImportService.ImportAsync();
        }

        [HttpGet]
        [Authorize]
        [Route("consent")]
        public string GetConsentUrl()
        {
            return azureConsentService.GetConsentUri(this.Request.Host.Value).ToString();
        }


        [HttpGet]
        [Route("consent/redirect")]
        public async Task<IActionResult> ConsentReponseRedirect()
        {
            var code = this.HttpContext.Request.Query.FirstOrDefault(x => x.Key == "code").Value;
            var token = await azureAuthenticationService.GetAuthTokenForCodeAsync(code.ToString());

            if (!webHostEnvironment.IsDevelopment())
            {
                return Redirect($"../../integratorAuthRedirect?token={token.AccessToken}");
            }

            return Redirect($"https://localhost:5173/integratorAuthRedirect?token={token.AccessToken}");
        }
    }
}
