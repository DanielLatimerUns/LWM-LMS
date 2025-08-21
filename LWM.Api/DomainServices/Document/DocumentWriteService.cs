using LWM.Api.DomainServices.Document.Contracts;
using LWM.Api.Dtos.Models;
using LWM.Api.Framework.Exceptions;
using LWM.Data.Contexts;
using LWM.Data.Models;

namespace LWM.Api.DomainServices.Document
{
    public class DocumentWriteService : IDocumentWriteService
    {
        private CoreContext _context { get; set; }

        public DocumentWriteService(CoreContext context)
        {
            _context = context;
        }

        public async Task<int> CreateAsync(LessonDocumentModel document, AzureObjectLink? azureObjectLink = null)
        {
            var model = new Data.Models.Document.Document
            {
                Name = document.Name,
                DocumentPath = document.Path,
                AzureObjectLink = azureObjectLink
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

        public async Task UpdateAsync(LessonDocumentModel document)
        {
            var model = _context.Documents.FirstOrDefault(x => x.Id == document.Id);

            Validate(model);

            model.Name = document.Name;
            model.DocumentPath = document.Path;

            await _context.SaveChangesAsync();
        }

        private void Validate(Data.Models.Document.Document model)
        {
            if (model is null)
                throw new NotFoundException("No Document Found.");
        }
    }
}
