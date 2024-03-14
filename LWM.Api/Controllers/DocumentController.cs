using LWM.Api.ApplicationServices.DocumentServices;
using LWM.Api.DomainServices.DocumentService.Contracts;
using LWM.Api.Dtos.DomainEntities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LWM.Api.Controllers
{
    [ApiController]
    [Authorize]
    [Route("document")]
    public class DocumentController(
        IDocumentCreationService documentCreationService,
        IDocumentReadService documentReadService,
        IDocumentWriteService documentWriteService) : Controller
    {

        [HttpGet]
        public async Task<IEnumerable<LessonDocument>> Get()
        {
            return await documentReadService.GetDocumentsAsync();
        }

        [HttpGet("{lessonId}")]
        public async Task<IEnumerable<LessonDocument>> GetForLesson(int lessonId)
        {
            return await documentReadService.GetDocumentsAsync(lessonId);
        }

        [HttpPost]
        public async Task<int> Create([FromForm]LessonDocument document)
        {
            return await documentCreationService.Execute(document);
        }

        [HttpPut]
        public async Task Update(LessonDocument document)
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

