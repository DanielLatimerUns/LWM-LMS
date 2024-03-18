using LWM.Api.Dtos.DomainEntities;

namespace LWM.Api.ApplicationServices.Document.Contracts
{
    public interface IDocumentQueries
    {
        Task<IEnumerable<LessonDocument>> GetDocumentsAsync();
        Task<IEnumerable<LessonDocument>> GetDocumentsAsync(int lessonId);
    }
}