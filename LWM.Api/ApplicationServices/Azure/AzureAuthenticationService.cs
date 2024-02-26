﻿using LWM.Api.ApplicationServices.Azure.Contracts;
using LWM.Api.Dtos.Azure;
using LWM.Api.Framework.Exceptions;

namespace LWM.Api.ApplicationServices.Azure
{
    public class AzureAuthenticationService : IAzureAuthenticationService
    {
        public async Task<AzureAuthResponse> GetAuthTokenForCode(string code)
        {
            using var httpClient = new HttpClient();

            var request = new HttpRequestMessage
            {
                Method = new HttpMethod("POST"),
                Content = new FormUrlEncodedContent(new Dictionary<string, string>
                {
                    {"tenant", "consumers"},
                    {"client_id", "8bef44ef-0d04-4652-bc0f-a1886f3d6333" },
                    {"scope", AzureConstants.Scopes},
                    {"code",  code},
                    {"redirect_uri", "https://localhost:7120/azure/consent/redirect" },
                    {"grant_type", "authorization_code" },
                    {"client_secret", "enc8Q~01qMpSJsSEBwJ3Ah_MHMKL99Tjf2m7MbZ~" }
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