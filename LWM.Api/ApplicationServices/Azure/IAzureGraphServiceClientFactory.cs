using Microsoft.Graph;

namespace LWM.Api.ApplicationServices.Azure
{
    public interface IAzureGraphServiceClientFactory
    {
        BaseGraphServiceClient CreateGraphClient();
    }
}