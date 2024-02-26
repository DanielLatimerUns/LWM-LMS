using LWM.Api.ApplicationServices.Azure.Contracts;
using Microsoft.Extensions.Caching.Memory;
using System.Web;

namespace LWM.Api.ApplicationServices.Azure
{
    public class AzureConsentService(
        IMemoryCache cache,
        IConfiguration configuration) : IAzureConsentService
    {

        public Uri GetConsentUri(string host)
        {
            var scope = HttpUtility.UrlEncode(configuration["AzureIntergration:Scopes"]);
            var responseType = HttpUtility.UrlEncode("code");
            var clientId = HttpUtility.UrlEncode(configuration["AzureIntergration:ClientId"]);
            var redirect = HttpUtility.UrlEncode($"https://{host}/azure/consent/redirect");

            var baseLoginUrl = "https://login.microsoftonline.com/consumers/oauth2/v2.0/authorize";

            return new Uri($"{baseLoginUrl}?" +
                $"scope={scope}&" +
                $"response_type={responseType}&" +
                $"client_id={clientId}&" +
                $"redirect_uri={redirect}");
        }
    }
}
