using LWM.Api.Dtos;

namespace LWM.Api.DomainServices.DocumentService.Contracts
{
    public interface IDocumentWriteService
    {
        Task<int> CreateAsync(LessonDocument document);

        Task DeleteAsync(int documentId);

        Task UpdateAsync(LessonDocument document);
    }
}