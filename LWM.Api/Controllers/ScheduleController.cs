using LWM.Api.ApplicationServices.Scheduling;
using LWM.Api.ApplicationServices.Scheduling.Queries;
using LWM.Api.ApplicationServices.Scheduling.Services;
using LWM.Api.Dtos.Models;
using LWM.Api.Dtos.ViewModels;
using LWM.Authentication.DataAccess;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace LWM.Api.Controllers
{
    [ApiController]
    [Authorize]
    [Route("schedule")]
    public class ScheduleController(
        IScheduleService scheduleService,
        IScheduleQueries scheduleQueries,
        IClashDetectionService clashDetectionService,
        UserManager<User> userManager)  : Controller
    {

        [HttpGet]
        public IEnumerable<ScheduleEntryModel> Get()
        {
            return scheduleQueries.GetScheduleEntries();
        }

        [HttpGet("current")]
        public async Task<LessonViewModel> GetCurrentForUser()
        {
            var user = await userManager.GetUserAsync(HttpContext.User);

            if (user is null)
            {
                throw new BadHttpRequestException("No User Logged In");
            }

            return scheduleQueries
                .GetCurrentLessonForTeacher(new UserViewModel { PersonId = user.PersonId });
        }

        [HttpGet("feed")]
        public async Task<LessonFeedViewModel> GetFeedForUser()
        {
            var user = await userManager.GetUserAsync(HttpContext.User);

            if (user is null)
            {
                throw new BadHttpRequestException("No User Logged In");
            }

            return scheduleQueries
                .GetCurrentLessonFeedForTeacher(new UserViewModel { PersonId = user.PersonId });
        }

        [HttpPost]
        public async Task<int> Create(ScheduleEntryModel model)
        {
            return await scheduleService.Create(model);
        }

        [HttpPut]
        public async Task Update(ScheduleEntryModel model)
        {
            await scheduleService.Update(model);
        }

        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await scheduleService.Delete(id);
        }

        [HttpPost("clash")]
        public ScheduleEntryModel HasClash(ScheduleEntryModel scheduleEntry)
        {
            return clashDetectionService.FindClash(scheduleEntry);
        }
    }
}
