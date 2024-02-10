using LWM.Api.ApplicationServices.SchedualingServices.Contracts;
using LWM.Api.DomainServices.LessonScheduleService.Contracts;
using LWM.Api.Dtos.DomainEntities;
using LWM.Api.Dtos.ViewModels;
using LWM.Authentication.DataAccess;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace LWM.Api.Controllers
{
    [ApiController]
    [Authorize]
    [Route("lessonschedule")]
    public class LessoncScheduleController(
        ILessonSchedualCreationService lessonSchedualCreationService,
        ILessonSchedualDeleteService lessonSchedualDeleteService,
        ILessonSchedualUpdateService lessonSchedualUpdateService,
        ILessonScheduleQueries lessonScheduleQueries,
        IClashDetectionService clashDetectionService,
        UserManager<User> userManager)  : Controller
    {

        [HttpGet]
        public IEnumerable<LessonSchedule> Get()
        {
            return lessonScheduleQueries.GetLessonSchedules();
        }

        [HttpGet("current")]
        public async Task<LessonViewModel> GetCurrentForUser()
        {
            var user = await userManager.GetUserAsync(HttpContext.User);

            if (user is null)
            {
                throw new BadHttpRequestException("No User Logged In");
            }

            return lessonScheduleQueries
                .GetCurrentLessonForTeacher(new Web.ViewModels.UserViewModel { PersonId = user.PersonId });
        }

        [HttpGet("feed")]
        public async Task<LessonFeedViewModel> GetFeedForUser()
        {
            var user = await userManager.GetUserAsync(HttpContext.User);

            if (user is null)
            {
                throw new BadHttpRequestException("No User Logged In");
            }

            return lessonScheduleQueries
                .GetCurrentLessonFeedForTeacher(new Web.ViewModels.UserViewModel { PersonId = user.PersonId });
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

        [HttpPost("clash")]
        public LessonSchedule HasClash(LessonSchedule lessonSchedule)
        {
            return clashDetectionService.FindClash(lessonSchedule);
        }
    }
}
