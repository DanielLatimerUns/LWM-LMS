using LWM.Api.DomainServices.Schedule.Contracts;
using LWM.Api.Dtos.Models;
using LWM.Api.Framework.Exceptions;
using LWM.Data.Contexts;
using LWM.Data.Models.Schedule;
using Microsoft.EntityFrameworkCore;

namespace LWM.Api.DomainServices.Schedule
{
    public class ScheduleWriteService(CoreContext context) : IScheduleWriteService
    {
        public async Task<int> CreateAsync(ScheduleEntryModel scheduleEntry)
        {
            var model = new ScheduleItem
            {
                ScheduledDayOfWeek = scheduleEntry.ScheduledDayOfWeek.Value,
                ScheduledStartTime = TimeOnly.Parse(scheduleEntry.ScheduledStartTime),
                ScheduledEndTime = TimeOnly.Parse(scheduleEntry.ScheduledEndTime),
                Group = await context.Groups.FirstAsync(x => x.Id == scheduleEntry.GroupId),
                StartWeek = scheduleEntry.StartWeek,
                Repeat = scheduleEntry.Repeat,
            };

            context.Schedules.Add(model);

            await context.SaveChangesAsync();

            return model.Id;
        }

        public async Task DeleteAsync(int lessonScheduleId)
        {
            var model = context.Schedules.FirstOrDefault(x => x.Id == lessonScheduleId);

            Validate(model);

            context.Schedules.Remove(model);

            await context.SaveChangesAsync();
        }

        public async Task UpdateAsync(ScheduleEntryModel scheduleEntry)
        {
            var model = context.Schedules.FirstOrDefault(x => x.Id == scheduleEntry.Id);

            Validate(model);

            model.ScheduledDayOfWeek = scheduleEntry.ScheduledDayOfWeek.Value;
            model.ScheduledStartTime = TimeOnly.Parse(scheduleEntry.ScheduledStartTime);
            model.ScheduledEndTime = TimeOnly.Parse(scheduleEntry.ScheduledEndTime);
            model.Group = await context.Groups.FirstAsync(x => x.Id == scheduleEntry.GroupId);
            model.Repeat = scheduleEntry.Repeat;
            model.StartWeek = scheduleEntry.StartWeek;

            await context.SaveChangesAsync();
        }

        private void Validate(ScheduleItem model)
        {
            if (model is null)
                throw new NotFoundException("No Lesson Schedule Found.");
        }
    }
}
