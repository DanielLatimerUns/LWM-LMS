using LWM.Api.DomainServices.DocumentService.Contracts;
using LWM.Api.Dtos.DomainEntities;
using LWM.Api.Framework.Exceptions;
using LWM.Data.Contexts;
using LWM.Data.Models;

namespace LWM.Api.DomainServices.DocumentService
{
    public class DocumentWriteService : IDocumentWriteService
    {
        private CoreContext _context { get; set; }

        public DocumentWriteService(CoreContext context)
        {
            _context = context;
        }

        public async Task<int> CreateAsync(LessonDocument document)
        {
            var model = new Document
            {
                Name = document.Name,
                DocumentPath = document.Path,
            };

            _context.Documents.Add(model);

            var lesson = _context.Lessons.First(x => x.Id == document.LessonId);

            if (lesson is null)
            {
                throw new BadHttpRequestException("No Lesson Found");
            }

            lesson.Documents.Add(model);

            await _context.SaveChangesAsync();

            return model.Id;
        }

        public async Task DeleteAsync(int documentId)
        {
            var model = _context.Documents.FirstOrDefault(x => x.Id == documentId);

            Validate(model);

            _context.Documents.Remove(model);

            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(LessonDocument document)
        {
            var model = _context.Documents.FirstOrDefault(x => x.Id == document.Id);

            Validate(model);

            model.Name = document.Name;
            model.DocumentPath = document.Path;

            await _context.SaveChangesAsync();
        }

        private void Validate(Document model)
        {
            if (model is null)
                throw new NotFoundException("No Document Found.");
        }
    }
}
