using LWM.Api.ApplicationServices.SchedualingServices.Contracts;
using LWM.Api.DomainServices.LessonScheduleService.Contracts;
using LWM.Api.Dtos.DomainEntities;
using Microsoft.AspNetCore.Mvc;

namespace LWM.Api.Controllers
{
    [ApiController]
    [Route("lessonschedule")]
    public class LessoncScheduleController(
        ILessonSchedualCreationService lessonSchedualCreationService,
        ILessonSchedualDeleteService lessonSchedualDeleteService,
        ILessonSchedualUpdateService lessonSchedualUpdateService,
        ILessonScheduleReadService lessonScheduleReadService) : Controller
    {

        [HttpGet]
        public async Task<IEnumerable<LessonSchedule>> Get()
        {
            return await lessonScheduleReadService.GetLessonSchedules();
        }

        [HttpPost]
        public async Task<int> Create(LessonSchedule person)
        {
            return await lessonSchedualCreationService.Execute(person);
        }

        [HttpPut]
        public async Task Update(LessonSchedule person)
        {
            await lessonSchedualUpdateService.Execute(person);
        }

        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await lessonSchedualDeleteService.Execute(id);
        }

    }
}
