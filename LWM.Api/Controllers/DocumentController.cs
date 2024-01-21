using LWM.Api.DomainServices.DocumentService.Contracts;
using LWM.Api.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace LWM.Api.Controllers
{
    [ApiController]
    [Route("document")]
    public class DocumentController : Controller
    {
        private readonly IDocumentWriteService _documentWriteService;

        private readonly IDocumentReadService _documentReadService;

        public DocumentController(
            IDocumentWriteService documentWriteService, 
            IDocumentReadService documentReadService)
        {
            _documentWriteService = documentWriteService;
            _documentReadService = documentReadService;
        }

        [HttpGet]
        public async Task<IEnumerable<LessonDocument>> Get()
        {
            return await _documentReadService.GetDocumentsAsync();
        }

        [HttpGet("{lessonId}")]
        public async Task<IEnumerable<LessonDocument>> GetForLesson(int lessonId)
        {
            return await _documentReadService.GetDocumentsAsync(lessonId);
        }

        [HttpPost]
        public async Task<int> Create(LessonDocument document)
        {
            return await _documentWriteService.CreateAsync(document);
        }

        [HttpPut]
        public async Task Update(LessonDocument document)
        {
            await _documentWriteService.UpdateAsync(document);
        }

        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _documentWriteService.DeleteAsync(id);
        }
    }
}

