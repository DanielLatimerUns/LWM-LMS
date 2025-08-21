using LWM.Api.ApplicationServices.Document.Queries;
using LWM.Api.ApplicationServices.Document.Services;
using LWM.Api.DomainServices.Document.Contracts;
using LWM.Api.Dtos.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LWM.Api.Controllers
{
    [ApiController]
    [Authorize]
    [Route("document")]
    public class DocumentController(
        IDocumentQueries documentQueries,
        IDocumentService documentService,
        IDocumentWriteService documentWriteService) : Controller
    {

        [HttpGet]
        public async Task<IEnumerable<LessonDocumentModel>> Get()
        {
            return await documentQueries.GetDocumentsAsync();
        }

        [HttpGet("{lessonId}")]
        public async Task<IEnumerable<LessonDocumentModel>> GetForLesson(int lessonId)
        {
            return await documentQueries.GetDocumentsAsync(lessonId);
        }

        [HttpPost]
        public async Task<int> Create([FromForm]LessonDocumentModel document)
        {
            return await documentService.Create(document);
        }

        [HttpPut]
        public async Task Update(LessonDocumentModel document)
        {
            //await _documentWriteService.UpdateAsync(document);
        }

        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await documentWriteService.DeleteAsync(id);
        }
    }
}

