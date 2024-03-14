using LWM.Api.Dtos.DomainEntities;

namespace LWM.Api.ApplicationServices.DocumentServices
{
    public interface IDocumentCreationService
    {
        Task<int> Execute(LessonDocument document);
    }
}