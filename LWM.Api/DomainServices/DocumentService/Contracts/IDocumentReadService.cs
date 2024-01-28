using LWM.Api.Dtos.DomainEntities;
using LWM.Data.Models;

namespace LWM.Api.DomainServices.DocumentService.Contracts
{
    public interface IDocumentReadService
    {
        Task<IEnumerable<LessonDocument>> GetDocumentsAsync();

        Task<IEnumerable<LessonDocument>> GetDocumentsAsync(int lessonId);
    }
}