using LWM.Api.ApplicationServices.Azure;
using LWM.Api.ApplicationServices.Azure.Auth;
using LWM.Api.ApplicationServices.Azure.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LWM.Api.Controllers
{
    [ApiController]
    [Route("azure")]
    public class AzureController(
        IAzureConsentService azureConsentService, 
        IAzureLessonImportService azureLessonImportService,
        IAzureAuthenticationService azureAuthenticationService) : Controller
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
            return azureConsentService.GetConsentUri(Request.Host.Value).ToString();
        }

        [HttpGet]
        [Route("consent/redirect")]
        public async Task<IActionResult> ConsentReponseRedirect()
        {
            return await azureAuthenticationService.HandleAuthResponseRedirect(
                this.HttpContext.Request.Query.FirstOrDefault(x => x.Key == "code").Value,
                this.Request.Host.Value);        
        }
    }
}
