using LWM.Api.ApplicationServices.SchedualingServices.Contracts;
using LWM.Api.DomainServices.LessonScheduleService.Contracts;
using LWM.Api.DomainServices.LessonService.Contracts;
using LWM.Data.Models;

namespace LWM.Api.ApplicationServices.SchedualingServices
{
    public class ClashDetectionService(ILessonScheduleReadService lessonScheduleReadService) : IClashDetectionService
    {
        public async Task<bool> LessonSceduleHasClash(Dtos.DomainEntities.LessonSchedule lessonSchedule)
        {
            if (lessonSchedule.SchedualedStartTime is null || lessonSchedule.SchedualedEndTime is null)
                return false;

            if (lessonSchedule.SchedualedDayOfWeek is null)
                return false;

            var parsedStartTime = TimeOnly.Parse(lessonSchedule.SchedualedStartTime);
            var parsedEndTime = TimeOnly.Parse(lessonSchedule.SchedualedEndTime);

            var potentialClashes =
            await lessonScheduleReadService.GetLessonSchedules(
                x => x.SchedualedDayOfWeek == lessonSchedule.SchedualedDayOfWeek);

            foreach(var potentialClash in potentialClashes)
            {
                var clashTimeStart = TimeOnly.Parse(potentialClash.SchedualedStartTime);
                var clashTimeEnd = TimeOnly.Parse(potentialClash.SchedualedEndTime);

                if (parsedStartTime < clashTimeStart & parsedEndTime < clashTimeEnd) // start time before - end time within
                    return true;

                if (parsedStartTime > clashTimeStart & parsedEndTime > clashTimeEnd) // start time within - end time after
                    return true;

                if (parsedStartTime < clashTimeStart & parsedEndTime > clashTimeEnd) // start time before - end time after
                    return true;
            }

            return false;
        }
    }
}
