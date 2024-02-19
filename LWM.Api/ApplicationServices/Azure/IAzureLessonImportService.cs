using LWM.Api.Dtos.AzureResponses;
using Microsoft.Graph.Models;

namespace LWM.Api.ApplicationServices.Azure
{
    public interface IAzureLessonImportService
    {
        Task Import();
    }
}