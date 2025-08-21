using LWM.Data.Contexts;
using Microsoft.Extensions.Caching.Memory;
using System.Web;
using LWM.Api.Framework.Exceptions;

namespace LWM.Api.ApplicationServices.Azure.Auth
{
    public interface IAzureConsentService
    {
        Uri GetConsentUri(string host, bool forceLogin = false);
    }

    public class AzureConsentService(
        IMemoryCache cache,
        IConfiguration configuration,
        IWebHostEnvironment webHostEnvironment,
        CoreContext coreContext) : IAzureConsentService
    {

        public Uri GetConsentUri(string host, bool forceLogin = false)
        {
            var azureConfiguration = coreContext.Configurations.FirstOrDefault();
            if (azureConfiguration == null)
            {
                throw new BadRequestException("Azure Configuration not found.");
            }
            
            var scope = HttpUtility.UrlEncode(configuration["AzureIntergration:Scopes"]);
            var responseType = HttpUtility.UrlEncode("code");
            var clientId = HttpUtility.UrlEncode(configuration["AzureIntergration:ClientId"]);
            var redirect = HttpUtility.UrlEncode($"https://{host}{(webHostEnvironment.IsDevelopment() ? "" : "/api")}/azure/consent/redirect");

            var baseLoginUrl = "https://login.microsoftonline.com/consumers/oauth2/v2.0/authorize";

            return new Uri($"{baseLoginUrl}?" +
                $"login_hint={azureConfiguration.AzureUserEmail}&" +
                $"scope={scope}&" +
                $"response_type={responseType}&" +
                $"client_id={clientId}&" +
                $"redirect_uri={redirect}" +
                $"{(forceLogin ? "&prompt=select_account" : "")}");
        }
    }
}
