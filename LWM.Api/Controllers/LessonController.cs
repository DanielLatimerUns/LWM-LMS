using LWM.Api.ApplicationServices.Lesson.Contracts;
using LWM.Api.DomainServices.LessonService.Contracts;
using LWM.Api.Dtos.DomainEntities;
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
        public async Task<IEnumerable<Lesson>> Get()
        {
            return await lessonQueries.GetLessonsAsync();
        }

        [HttpGet("{searchString}")]
        public async Task<IEnumerable<Lesson>> GetWithFilter(string searchString)
        {
            return await lessonQueries.GetLessonsAsync(x => x.Name.Contains(searchString));
        }

        [HttpPost]
        public async Task<int> Create(Lesson lesson)
        {
            return await lessonWriteService.CreateAsync(lesson);
        }

        [HttpPut]
        public async Task Update(Lesson lesson)
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
