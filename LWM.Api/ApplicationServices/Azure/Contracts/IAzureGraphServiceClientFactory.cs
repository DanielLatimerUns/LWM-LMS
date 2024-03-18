using Microsoft.Graph;

namespace LWM.Api.ApplicationServices.Azure.Contracts
{
    public interface IAzureGraphServiceClientFactory
    {
        Task<BaseGraphServiceClient> CreateGraphClientAsync();
    }
}