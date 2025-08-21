using LWM.Api.ApplicationServices.Lesson.Queries;
using LWM.Api.DomainServices.Lesson.Contracts;
using LWM.Api.Dtos.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LWM.Api.Controllers
{
    [ApiController]
    [Authorize]
    [Route("lesson")]
    [Authorize]
    public class LessonController(
        ILessonWriteService lessonWriteService,
        ILessonQueries lessonQueries) : Controller
    {

        [HttpGet]
        public async Task<IEnumerable<LessonModel>> Get()
        {
            return await lessonQueries.GetLessonsAsync();
        }

        [HttpGet("{searchString}")]
        public async Task<IEnumerable<LessonModel>> GetWithFilter(string searchString)
        {
            return await lessonQueries.GetLessonsBySearchStringAsync(searchString);
        }

        [HttpPost]
        public async Task<int> Create(LessonModel lesson)
        {
            return await lessonWriteService.CreateAsync(lesson);
        }

        [HttpPut]
        public async Task Update(LessonModel lesson)
        {
            await lessonWriteService.UpdateAsync(lesson);
        }

        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await lessonWriteService.DeleteAsync(id);
        }
    }
}
