using LWM.Api.Dtos.Models;
using LWM.Api.Framework.Exceptions;
using LWM.Data.Contexts;

namespace LWM.Api.ApplicationServices.Scheduling
{
    public interface IClashDetectionService
    {
        ScheduleEntryModel FindClash(ScheduleEntryModel scheduleEntry);
    }

    public class ClashDetectionService(CoreContext context) : IClashDetectionService
    {
        public ScheduleEntryModel FindClash(ScheduleEntryModel scheduleEntry)
        {
            if (scheduleEntry.ScheduledStartTime is null || scheduleEntry.ScheduledEndTime is null)
                throw new BadRequestException("Missing start or end time.");

            if (scheduleEntry.ScheduledDayOfWeek is null)
                throw new BadRequestException("Missing day of week.");

            var parsedStartTime = TimeOnly.Parse(scheduleEntry.ScheduledStartTime);
            var parsedEndTime = TimeOnly.Parse(scheduleEntry.ScheduledEndTime);

            if (parsedEndTime < parsedStartTime)
                throw new BadRequestException("End time before start time.");

            var potentialClashes =
                context.Schedules.Where(
                    x => x.ScheduledDayOfWeek == scheduleEntry.ScheduledDayOfWeek &&
                         ((x.StartWeek == scheduleEntry.StartWeek) || 
                          ((x.StartWeek + x.Repeat) <= (scheduleEntry.StartWeek + scheduleEntry.Repeat)) ||
                                (x.StartWeek > scheduleEntry.StartWeek && scheduleEntry.Repeat == 0) ||
                                    (scheduleEntry.StartWeek > x.StartWeek && x.Repeat == 0)));

            foreach(var potentialClash in potentialClashes)
            {
                if (potentialClash.Id == scheduleEntry.Id) { continue; }

                var clashTimeStart = potentialClash.ScheduledStartTime;
                var clashTimeEnd = potentialClash.ScheduledEndTime;

                if (parsedStartTime.IsBetween(clashTimeStart, clashTimeEnd) || 
                    parsedEndTime.IsBetween(clashTimeStart, clashTimeEnd) ||
                    parsedStartTime < clashTimeStart && parsedEndTime > clashTimeEnd)
                {
                    return new ScheduleEntryModel
                    {
                        Id = potentialClash.Id,
                        ScheduledStartTime = potentialClash.ScheduledStartTime.ToString(),
                        ScheduledEndTime = potentialClash.ScheduledEndTime.ToString(),
                        ScheduledDayOfWeek = potentialClash.ScheduledDayOfWeek,
                        ScheduledDayOfWeekName = ((DayOfWeek)potentialClash.ScheduledDayOfWeek).ToString()
                    };
                }
            }

            return null;
        }
    }
}
