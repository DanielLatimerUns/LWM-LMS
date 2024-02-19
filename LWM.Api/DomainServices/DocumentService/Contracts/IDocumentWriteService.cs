using LWM.Api.Dtos.DomainEntities;
using LWM.Data.Models;

namespace LWM.Api.DomainServices.DocumentService.Contracts
{
    public interface IDocumentWriteService
    {
        Task<int> CreateAsync(LessonDocument document, AzureObjectLink? azureObjectLink = null);

        Task DeleteAsync(int documentId);

        Task UpdateAsync(LessonDocument document);
    }
}