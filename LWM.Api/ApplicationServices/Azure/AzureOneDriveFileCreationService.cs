using Azure.Core.Extensions;
using LWM.Api.Dtos.Azure;

namespace LWM.Api.ApplicationServices.Azure
{
    public class AzureOneDriveFileCreationService(IAzureClientFactoryBuilder azureClientFactoryBuilder)
    {
        public string CreateFile(AzureFileEntity azureFileEntity)
        {
            return "";
        }
    }
}
