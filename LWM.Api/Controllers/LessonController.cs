using LWM.Api.DomainServices.LessonService.Contracts;
using LWM.Api.Dtos;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace LWM.Api.Controllers
{
    [ApiController]
    [Route("lesson")]
    public class LessonController : Controller
    {
        private readonly ILessonWriteService _lessonWriteService;

        private readonly ILessonReadService _lessonReadService;

        public LessonController(
            ILessonWriteService lessonWriteService, 
            ILessonReadService lessonReadService) 
        {
            _lessonReadService = lessonReadService;
            _lessonWriteService = lessonWriteService; 
        }

        [HttpGet]
        public async Task<IEnumerable<Lesson>> Get()
        {
            return await _lessonReadService.GetLessons();
        }

        [HttpPost]
        public async Task<int> Create(Lesson lesson)
        {
            return await _lessonWriteService.CreateAsync(lesson);
        }

        [HttpPut]
        public async Task Update(Lesson lesson)
        {
            await _lessonWriteService.UpdateAsync(lesson);
        }

        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _lessonWriteService.DeleteAsync(id);
        }
    }
}
