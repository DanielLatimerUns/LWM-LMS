using LWM.Api.Dtos.Models;
using LWM.Data.Models;

namespace LWM.Api.DomainServices.Document.Contracts
{
    public interface IDocumentWriteService
    {
        Task<int> CreateAsync(LessonDocumentModel document, AzureObjectLink? azureObjectLink = null);

        Task DeleteAsync(int documentId);

        Task UpdateAsync(LessonDocumentModel document);
    }
}