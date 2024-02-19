using LWM.Api.ApplicationServices.Azure;
using LWM.Api.ApplicationServices.DocumentServices.OneDrive;
using LWM.Api.Dtos.DomainEntities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Graph.Models;
using System.Web;

namespace LWM.Api.Controllers
{
    [ApiController]
    [Route("azure")]
    public class AzureController(IAzureConsentService azureConsentService, IAzureLessonImportService azureLessonImportService) : Controller
    {
        [HttpGet]
        [Route("import")]
        public async Task Import()
        {
           await azureLessonImportService.Import();
        }

        [HttpGet]
        [Route("consent")]
        public string GetConsentUrl()
        {
            return azureConsentService.GetConsentUri().ToString();
        }

        [HttpGet]
        [Route("consent/required")] 
        public bool RequiresConsent()
        {
            return azureConsentService.RequiresConsent();
        }

        [HttpGet]
        [Route("consent/redirect")]
        public IActionResult ConsentReponseRedirect()
        {
               var code = this.HttpContext.Request.Query.FirstOrDefault(x => x.Key == "code").Value;

            azureConsentService.HandleConsentResponse(code.ToString());

            return Ok("Authenticated with providor, you can now close this window!");
        }
    }
}
