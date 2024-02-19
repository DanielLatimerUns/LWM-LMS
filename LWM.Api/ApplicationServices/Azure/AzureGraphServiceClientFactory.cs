using Azure.Identity;
using LWM.Api.Framework.Exceptions;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Graph;

namespace LWM.Api.ApplicationServices.Azure
{
    public class AzureGraphServiceClientFactory(IMemoryCache cache) : IAzureGraphServiceClientFactory
    {
        public BaseGraphServiceClient CreateGraphClient()
        {
            if (!cache.TryGetValue("AzureToKen", out var token))
            {
                throw new BadRequestException("No Azure token found in cache.");
            }

            // Multi-tenant apps can use "common",
            // single-tenant apps must use the tenant ID from the Azure portal
            var tenantId = "consumers";

            // Values from app registration
            var clientId = "8bef44ef-0d04-4652-bc0f-a1886f3d6333";
            var clientSecret = "enc8Q~01qMpSJsSEBwJ3Ah_MHMKL99Tjf2m7MbZ~";

            // using Azure.Identity;
            var options = new AuthorizationCodeCredentialOptions
            {
                AuthorityHost = AzureAuthorityHosts.AzurePublicCloud,
                RedirectUri = new Uri("https://7techsolutions.net/api/azure/consent/redirect")
            };

            // https://learn.microsoft.com/dotnet/api/azure.identity.authorizationcodecredential

            AuthorizationCodeCredential? credentials = cache.Get("azureCreds") as AuthorizationCodeCredential;

            if (credentials == null)
            {
                credentials = new AuthorizationCodeCredential(
                    tenantId, clientId, clientSecret, token.ToString(), options);

                cache.Set("azureCreds", credentials, DateTime.Now.AddMinutes(55));
            }

            using var graphClient = new GraphServiceClient(credentials, AzureConstants.Scopes);

            return graphClient;
        }
    }
}
