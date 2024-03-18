using LWM.Api.Dtos.DomainEntities;

namespace LWM.Api.ApplicationServices.Document.Contracts
{
    public interface IDocumentCreationService
    {
        Task<int> Execute(LessonDocument document);
    }
}