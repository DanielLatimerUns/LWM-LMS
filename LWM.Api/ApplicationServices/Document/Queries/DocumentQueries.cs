namespace LWM.Api.ApplicationServices.Document.Queries
{
    using LWM.Api.ApplicationServices.Document.Contracts;
    using LWM.Api.Dtos.DomainEntities;
    using LWM.Data.Contexts;
    using LWM.Data.Models;
    using Microsoft.EntityFrameworkCore;

    public class DocumentQueries(
        CoreContext context) : IDocumentQueries
    {
        public async Task<IEnumerable<LessonDocument>> GetDocumentsAsync(int lessonId)
        {
            var query = context.Documents.Include(x => x.Lesson).Where(x => x.Lesson.Id == lessonId);
            var docs = await query.ToListAsync();

            return docs.Select(MapDto);
        }

        public async Task<IEnumerable<LessonDocument>> GetDocumentsAsync()
        {
            var query = context.Documents.Include(x => x.Lesson);
            var docs = await query.ToListAsync();

            return docs.Select(MapDto);
        }

        private static LessonDocument MapDto(Document document)
        {
            return new LessonDocument
            {
                Id = document.Id,
                LessonId = document.Lesson.Id,
                Name = document.Name,
                Path = document.DocumentPath
            };
        }
    }
}
