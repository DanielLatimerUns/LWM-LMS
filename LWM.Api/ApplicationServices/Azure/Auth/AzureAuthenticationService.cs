using LWM.Api.ApplicationServices.Azure.Auth;
using LWM.Api.ApplicationServices.Azure.Contracts;
using LWM.Api.Dtos.Azure;
using LWM.Api.Framework.Exceptions;
using LWM.Data.Contexts;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;

namespace LWM.Api.ApplicationServices.Azure
{
    public class AzureAuthenticationService(
        IConfiguration configuration, 
        CoreContext context,
        IWebHostEnvironment webHostEnvironment,
        IAzureConsentService azureConsentService
        ) : IAzureAuthenticationService
    {
        public async Task<AzureAuthResponse> GetAuthTokenForCodeAsync(
            string code,
            string host)
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
                    {
                        "redirect_uri",
                        webHostEnvironment.IsDevelopment() ? 
                            "https://localhost:7120/azure/consent/redirect" :
                                $"https://{host}/api/azure/consent/redirect"
                        },
                    {"grant_type", "authorization_code" },
                    {"client_secret", clientSecrect }
                }),
                RequestUri = new Uri("https://login.microsoftonline.com/consumers/oauth2/v2.0/token")
            };

            var response = httpClient.Send(request);

            if (!response.IsSuccessStatusCode)
            {
                throw new BadRequestException(await response.Content.ReadAsStringAsync());
            }

            var parsedResponse = await response.Content.ReadFromJsonAsync<AzureAuthResponse>();

            ValidateUser(parsedResponse);

            return parsedResponse;
        }

        public async Task<IActionResult> HandleAuthResponseRedirect(string code, string hostUrl)
        {
            try
            {
                var token = await this.GetAuthTokenForCodeAsync(
                    code.ToString(),
                    hostUrl);

                if (!webHostEnvironment.IsDevelopment())
                {
                    return new ContentResult
                    {
                        Content = @"<!doctype html>
                                    <body>
                                        <div id=""root""></div>
                                        <script>
                                            const azureAuthService = () => {
                                                const requestToken = '" + token.AccessToken + @"';

                                                if (requestToken) {
                                                    localStorage.setItem('azure_token', JSON.stringify({ token: requestToken, cached: new Date() }));
                                                    document.getElementById(""root"").innerHTML = ""Succsesfully authenticated with the Storage Providor!""
                                                    
                                                    setTimeout(() => window.close(), 3000);
                                                    return;
                                                }

                                                document.getElementById(""root"").innerHTML = ""Authentication with Storage Providor failed, please reload the application and try again.""
                                                return;
                                            }

                                            azureAuthService();
                                        </script>
                                    </body>
                                    </html>",
                        ContentType = @"text/html",
                    };
                }

                return new RedirectResult($"https://localhost:5173/integratorAuthRedirect?token={token.AccessToken}");
            }
            catch (Exception ex)
            {
                if (ex.GetType() == typeof(InvalidAzureUserException))
                    return new RedirectResult(azureConsentService.GetConsentUri(hostUrl, true).ToString());

                throw;
            }
        }

        private void ValidateUser(AzureAuthResponse azureAuthResponse)
        {
            var handler = new JwtSecurityTokenHandler();
            var token = handler.ReadJwtToken(azureAuthResponse.IdToken);

            var userEmail = token.Payload.FirstOrDefault(payload => payload.Key == "email").Value.ToString();
            var configuredUserEmail = context.Configurations.First().AzureUserEmail;

            if (configuredUserEmail != userEmail)
            {
                throw new InvalidAzureUserException(
                    $"One Drive authentication failed: Microsoft User '{userEmail}'" +
                    $" does not match configured Microsoft One Drive intergration user '{configuredUserEmail}'.");
            }
        }
    }
}
