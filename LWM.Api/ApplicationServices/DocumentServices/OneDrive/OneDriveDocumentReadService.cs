using Azure.Identity;
using LWM.Api.ApplicationServices.Azure;
using LWM.Api.Dtos.AzureResponses;
using LWM.Api.Framework.Exceptions;
using Microsoft.Graph;
using Microsoft.Graph.Models;
using System.Text;

namespace LWM.Api.ApplicationServices.DocumentServices.OneDrive
{
    public class OneDriveDocumentReadService(IAzureGraphServiceClientFactory azureGraphServiceClientFactory) : IOneDriveDocumentReadService
    {
        public async Task ImportDocumentsForLesson()
        {
        }
    }
}
