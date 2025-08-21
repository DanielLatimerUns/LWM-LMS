using LWM.Api.Dtos.Models;

namespace LWM.Api.ApplicationServices.Document.Queries
{
    using Data.Contexts;
    using Data.Models;
    using Microsoft.EntityFrameworkCore;

    public interface IDocumentQueries
    {
        Task<IEnumerable<LessonDocumentModel>> GetDocumentsAsync(int lessonId);
        Task<IEnumerable<LessonDocumentModel>> GetDocumentsAsync();
    }

    public class DocumentQueries(
        CoreContext context) : IDocumentQueries
    {
        public async Task<IEnumerable<LessonDocumentModel>> GetDocumentsAsync(int lessonId)
        {
            var query = context.Documents.Include(x => x.Lesson).Where(x => x.Lesson.Id == lessonId);
            var docs = await query.ToListAsync();

            return docs.Select(MapDto);
        }

        public async Task<IEnumerable<LessonDocumentModel>> GetDocumentsAsync()
        {
            var query = context.Documents.Include(x => x.Lesson);
            var docs = await query.ToListAsync();

            return docs.Select(MapDto);
        }

        private static LessonDocumentModel MapDto(Data.Models.Document.Document document)
        {
            return new LessonDocumentModel
            {
                Id = document.Id,
                LessonId = document.Lesson.Id,
                Name = document.Name,
                Path = document.DocumentPath
            };
        }
    }
}
