using LWM.Api.ApplicationServices.Azure.Contracts;
using LWM.Api.DomainServices.TeacherService.Contracts;
using LWM.Api.Framework.Services;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Graph;
using Microsoft.Kiota.Abstractions.Authentication;

namespace LWM.Api.ApplicationServices.Azure
{
    public class AzureGraphServiceClientFactory(IApplicationInstanceService applicationInstanceService) : IAzureGraphServiceClientFactory
    {
        public async Task<BaseGraphServiceClient> CreateGraphClient()
        {
            var state = applicationInstanceService.GetRequestState();

            var authenticationProvider = new BaseBearerTokenAuthenticationProvider(
                new TokenProvider(state.AzureAuthToken));

            GraphServiceClient graphClient = new GraphServiceClient(authenticationProvider);
            return graphClient;
        }

        public class TokenProvider(string token) : IAccessTokenProvider
        {
            public Task<string> GetAuthorizationTokenAsync(Uri uri, Dictionary<string, object> additionalAuthenticationContext = default,
                CancellationToken cancellationToken = default)
            {
                return Task.FromResult(token);
            }

            public AllowedHostsValidator? AllowedHostsValidator { get; }
        }
    }
}
