using LWM.Api.ApplicationServices.Azure.Contracts;
using LWM.Api.Dtos.Azure;
using LWM.Api.Framework.Exceptions;
using LWM.Data.Contexts;
using System.IdentityModel.Tokens.Jwt;
using System.Web;

namespace LWM.Api.ApplicationServices.Azure
{
    public class AzureAuthenticationService(IConfiguration configuration, CoreContext context) : IAzureAuthenticationService
    {
        public async Task<AzureAuthResponse> GetAuthTokenForCodeAsync(
            string code)
        {
            using var httpClient = new HttpClient();

            var clientId = configuration["AzureIntergration:ClientId"];
            var clientSecrect = configuration["AzureIntergration:ClientSecret"];

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

            ValidateUser(parsedResponse);

            return parsedResponse;
        }

        private void ValidateUser(AzureAuthResponse azureAuthResponse)
        {
            var handler = new JwtSecurityTokenHandler();
            var token = handler.ReadJwtToken(azureAuthResponse.IdToken);

            var userEmail = token.Payload.FirstOrDefault(payload => payload.Key == "email").Value.ToString();
            var configuredUserEmail = context.Configurations.First().AzureUserEmail;

            if (configuredUserEmail != userEmail)
            {
                throw new BadRequestException($"One Drive authentication failed: Microsoft User '{userEmail}' does not match configured Microsoft One Drive intergration user '{configuredUserEmail}'.");
            }
        }
    }
}
