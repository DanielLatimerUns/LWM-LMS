using LWM.Api.DomainServices.DocumentService.Contracts;
using LWM.Api.Dtos;
using LWM.Data.Contexts;
using LWM.Data.Models;
using Microsoft.EntityFrameworkCore;
using System;

namespace LWM.Api.DomainServices.DocumentService
{
    public class DocumentReadService : IDocumentReadService
    {
        private CoreContext _context { get; set; }

        public DocumentReadService(CoreContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<LessonDocument>> GetDocumentsAsync(int lessonId)
        {
            var query = _context.Documents.Include(x => x.Lesson).Where(x => x.Lesson.Id == lessonId);
            var docs = await query.ToListAsync();

            return docs.Select(MapDto);
        }

        public async Task<IEnumerable<LessonDocument>> GetDocumentsAsync()
        {
            var query = _context.Documents.Include(x => x.Lesson);
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
