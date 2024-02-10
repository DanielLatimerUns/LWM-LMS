using LWM.Api.DomainServices.GroupService.Contracts;
using LWM.Api.DomainServices.LessonScheduleService.Contracts;
using LWM.Api.Dtos.DomainEntities;
using LWM.Api.Framework.Exceptions;
using LWM.Data.Contexts;
using Microsoft.EntityFrameworkCore;

namespace LWM.Api.DomainServices.LessonSchedualService
{
    public class LessonScheduleWriteService(CoreContext context) : ILessonScheduleWriteService
    {
        public async Task<int> CreateAsync(LessonSchedule lessonSchedule)
        {
            var model = new Data.Models.LessonSchedule
            {
                SchedualedDayOfWeek = lessonSchedule.SchedualedDayOfWeek.Value,
                SchedualedStartTime = TimeOnly.Parse(lessonSchedule.SchedualedStartTime),
                SchedualedEndTime = TimeOnly.Parse(lessonSchedule.SchedualedEndTime),
                Group = await context.Groups.FirstAsync(x => x.Id == lessonSchedule.GroupId),
                StartWeek = lessonSchedule.StartWeek,
                Repeat = lessonSchedule.Repeat,
            };

            context.LessonSchedules.Add(model);

            await context.SaveChangesAsync();

            return model.Id;
        }

        public async Task DeleteAsync(int lessonScheduleId)
        {
            var model = context.LessonSchedules.FirstOrDefault(x => x.Id == lessonScheduleId);

            Validate(model);

            context.LessonSchedules.Remove(model);

            await context.SaveChangesAsync();
        }

        public async Task UpdateAsync(LessonSchedule lessonSchedule)
        {
            var model = context.LessonSchedules.FirstOrDefault(x => x.Id == lessonSchedule.Id);

            Validate(model);

            model.SchedualedDayOfWeek = lessonSchedule.SchedualedDayOfWeek.Value;
            model.SchedualedStartTime = TimeOnly.Parse(lessonSchedule.SchedualedStartTime);
            model.SchedualedEndTime = TimeOnly.Parse(lessonSchedule.SchedualedEndTime);
            model.Group = await context.Groups.FirstAsync(x => x.Id == lessonSchedule.GroupId);
            model.Repeat = lessonSchedule.Repeat;
            model.StartWeek = lessonSchedule.StartWeek;

            await context.SaveChangesAsync();
        }

        private void Validate(Data.Models.LessonSchedule model)
        {
            if (model is null)
                throw new NotFoundException("No Lesson Schedule Found.");
        }
    }
}
