using LWM.Api.ApplicationServices.Azure.Contracts;
using LWM.Api.Dtos.Azure;
using LWM.Api.Framework.Exceptions;
using System.Web;

namespace LWM.Api.ApplicationServices.Azure
{
    public class AzureAuthenticationService(IConfiguration configuration) : IAzureAuthenticationService
    {
        public async Task<AzureAuthResponse> GetAuthTokenForCode(
            string code)
        {
            using var httpClient = new HttpClient();

            var clientId = HttpUtility.UrlEncode(configuration["AzureIntergration:ClientId"]);
            var clientSecrect = HttpUtility.UrlEncode(configuration["AzureIntergration:ClientSecret"]);

            var request = new HttpRequestMessage
            {
                Method = new HttpMethod("POST"),
                Content = new FormUrlEncodedContent(new Dictionary<string, string>
                {
                    {"tenant", "consumers"},
                    {"client_id", clientId},
                    {"scope", AzureConstants.Scopes},
                    {"code",  code},
                    {"redirect_uri", "https://localhost:7120/azure/consent/redirect" },
                    {"grant_type", "authorization_code" },
                    {"client_secret", clientSecrect }
                }),
                RequestUri = new Uri("https://login.microsoftonline.com/consumers/oauth2/v2.0/token")
            };

            var response = httpClient.Send(request);

            if (!response.IsSuccessStatusCode)
            {
                throw new BadRequestException(response.Content.ToString());
            }

            var parsedResponse = await response.Content.ReadFromJsonAsync<AzureAuthResponse>();
            return parsedResponse;
        }
    }
}
