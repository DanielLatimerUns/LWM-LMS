using LWM.Api.Dtos.AzureResponses;
using Microsoft.Graph.Models;

namespace LWM.Api.ApplicationServices.DocumentServices.OneDrive
{
    public interface IOneDriveDocumentReadService
    {
        Task ImportDocumentsForLesson();
    }
}