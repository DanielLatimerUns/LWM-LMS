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
            if (scheduleEntry.SchedualedStartTime is null || scheduleEntry.SchedualedEndTime is null)
                throw new BadRequestException("Missing start or end time.");

            if (scheduleEntry.SchedualedDayOfWeek is null)
                throw new BadRequestException("Missing day of week.");

            var parsedStartTime = TimeOnly.Parse(scheduleEntry.SchedualedStartTime);
            var parsedEndTime = TimeOnly.Parse(scheduleEntry.SchedualedEndTime);

            if (parsedEndTime < parsedStartTime)
                throw new BadRequestException("End time before start time.");

            var potentialClashes =
                context.Schedules.Where(
                    x => x.ScheduledDayOfWeek == scheduleEntry.SchedualedDayOfWeek &&
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
                        SchedualedStartTime = potentialClash.ScheduledStartTime.ToString(),
                        SchedualedEndTime = potentialClash.ScheduledEndTime.ToString(),
                        SchedualedDayOfWeek = potentialClash.ScheduledDayOfWeek,
                        SchedualedDayOfWeekName = ((DayOfWeek)potentialClash.ScheduledDayOfWeek).ToString()
                    };
                }
            }

            return null;
        }
    }
}
