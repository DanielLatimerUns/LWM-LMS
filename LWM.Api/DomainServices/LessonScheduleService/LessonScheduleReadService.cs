using LWM.Api.DomainServices.LessonScheduleService.Contracts;
using LWM.Api.Dtos.DomainEntities;
using LWM.Data.Contexts;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace LWM.Api.DomainServices.LessonScheduleService
{
    public class LessonScheduleReadService(CoreContext context) : ILessonScheduleReadService
    {
        public async Task<IEnumerable<LessonSchedule>> GetLessonSchedules(Expression<Func<Data.Models.LessonSchedule, bool>> filter = null)
        {
            //TODO: refactor this to SOLID
            if (filter == null)
                return await context.LessonSchedules
                .Include(x => x.Group)
                .Select(x => new LessonSchedule
                {
                    Id = x.Id,
                    GroupId = x.Group.Id,
                    SchedualedDayOfWeek = x.SchedualedDayOfWeek,
                    SchedualedStartTime = x.SchedualedStartTime.ToString("HH:mm"),
                    SchedualedEndTime = x.SchedualedEndTime.ToString("HH:mm"),
                }).ToListAsync();

            return await context.LessonSchedules.Where(filter)
                .Include(x => x.Group)
                .Select(x => new LessonSchedule
                {
                    Id = x.Id,
                    GroupId = x.Group.Id,
                    SchedualedDayOfWeek = x.SchedualedDayOfWeek,
                    SchedualedStartTime = x.SchedualedStartTime.ToString(),
                    SchedualedEndTime = x.SchedualedEndTime.ToString(),
                })
                .ToListAsync();
        }
    }
}
