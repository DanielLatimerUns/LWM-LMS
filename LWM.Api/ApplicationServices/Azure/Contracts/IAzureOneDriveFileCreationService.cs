using LWM.Api.Dtos.Azure;

namespace LWM.Api.ApplicationServices.Azure.Contracts
{
    public interface IAzureOneDriveFileCreationService
    {
        Task<(string id, string path)> UploadFileAsync(AzureFileEntity azureFileEntity);
    }
}