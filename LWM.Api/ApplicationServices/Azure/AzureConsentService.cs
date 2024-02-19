using LWM.Api.Dtos.AzureResponses;
using Microsoft.AspNetCore.OutputCaching;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.OpenApi.Writers;
using System.Web;

namespace LWM.Api.ApplicationServices.Azure
{
    public class AzureConsentService(IMemoryCache cache) : IAzureConsentService
    {

        public Uri GetConsentUri()
        {
            var scope = HttpUtility.UrlEncode("openid profile email offline_access");
            var clientSecret = HttpUtility.UrlEncode("enc8Q~01qMpSJsSEBwJ3Ah_MHMKL99Tjf2m7MbZ~");
            var responseType = HttpUtility.UrlEncode("code");
            var clientId = HttpUtility.UrlEncode("8bef44ef-0d04-4652-bc0f-a1886f3d6333");
            var redirect = HttpUtility.UrlEncode("https://7techsolutions.net/api/azure/consent/redirect");

            var baseLoginUrl = "https://login.microsoftonline.com/consumers/oauth2/v2.0/authorize";

            return new Uri($"{baseLoginUrl}?" +
                $"scope={scope}&" +
                $"client_secret={clientSecret}&" +
                $"response_type={responseType}&" +
                $"client_id={clientId}&" +
                $"redirect_uri={redirect}");
        }

        public async Task HandleConsentResponse(string code)
        {
            cache.Set("AzureToKen", code, DateTime.Now.AddMinutes(5));
        }

        public bool RequiresConsent()
        {
            return !cache.TryGetValue("AzureToKen", out var _);
        }
    }
}
