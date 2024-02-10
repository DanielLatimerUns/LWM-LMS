using LWM.Api.ApplicationServices.SchedualingServices.Contracts;
using LWM.Api.Framework.Exceptions;
using LWM.Data.Contexts;

namespace LWM.Api.ApplicationServices.SchedualingServices
{
    public class ClashDetectionService(CoreContext context) : IClashDetectionService
    {
        public Dtos.DomainEntities.LessonSchedule FindClash(Dtos.DomainEntities.LessonSchedule lessonSchedule)
        {
            if (lessonSchedule.SchedualedStartTime is null || lessonSchedule.SchedualedEndTime is null)
                throw new BadRequestException("Missing start or end time.");

            if (lessonSchedule.SchedualedDayOfWeek is null)
                throw new BadRequestException("Missing day of week.");

            var parsedStartTime = TimeOnly.Parse(lessonSchedule.SchedualedStartTime);
            var parsedEndTime = TimeOnly.Parse(lessonSchedule.SchedualedEndTime);

            if (parsedEndTime < parsedStartTime)
                throw new BadRequestException("End time before start time.");

            var potentialClashes =
                context.LessonSchedules.Where(
                    x => x.SchedualedDayOfWeek == lessonSchedule.SchedualedDayOfWeek &&
                         ((x.StartWeek == lessonSchedule.StartWeek) || 
                          ((x.StartWeek + x.Repeat) <= (lessonSchedule.StartWeek + lessonSchedule.Repeat)) ||
                                (x.StartWeek > lessonSchedule.StartWeek && lessonSchedule.Repeat == 0) ||
                                    (lessonSchedule.StartWeek > x.StartWeek && x.Repeat == 0)));

            foreach(var potentialClash in potentialClashes)
            {
                if (potentialClash.Id == lessonSchedule.Id) { continue; }

                var clashTimeStart = potentialClash.SchedualedStartTime;
                var clashTimeEnd = potentialClash.SchedualedEndTime;

                if (parsedStartTime.IsBetween(clashTimeStart, clashTimeEnd) || 
                    parsedEndTime.IsBetween(clashTimeStart, clashTimeEnd) ||
                    parsedStartTime < clashTimeStart && parsedEndTime > clashTimeEnd)
                {
                    return new Dtos.DomainEntities.LessonSchedule
                    {
                        Id = potentialClash.Id,
                        SchedualedStartTime = potentialClash.SchedualedStartTime.ToString(),
                        SchedualedEndTime = potentialClash.SchedualedEndTime.ToString(),
                        SchedualedDayOfWeek = potentialClash.SchedualedDayOfWeek,
                        SchedualedDayOfWeekName = ((DayOfWeek)potentialClash.SchedualedDayOfWeek).ToString()
                    };
                }
            }

            return null;
        }
    }
}
