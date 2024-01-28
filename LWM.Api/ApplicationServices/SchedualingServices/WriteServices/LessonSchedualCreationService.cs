using LWM.Api.ApplicationServices.SchedualingServices.Contracts;
using LWM.Api.DomainServices.LessonScheduleService.Contracts;
using LWM.Api.Dtos.DomainEntities;

namespace LWM.Api.ApplicationServices.SchedualingServices.WriteServices
{
    public class LessonSchedualCreationService(
    ILessonScheduleWriteService scheduleWriteService,
    IClashDetectionService clashDetectionService) : ILessonSchedualCreationService
    {
        public async Task<int> Execute(LessonSchedule lessonSchedule)
        {
            await ValidateLessonSchedule(lessonSchedule);

            var result = await scheduleWriteService.CreateAsync(lessonSchedule);

            return result;
        }

        private async Task ValidateLessonSchedule(LessonSchedule lessonSchedule)
        {
            if (lessonSchedule is null)
                throw new BadHttpRequestException("No Lesson Schedual Provided.");

            if (lessonSchedule.SchedualedDayOfWeek is null)
                throw new BadHttpRequestException("Missing Day of week.");

            if (lessonSchedule.GroupId is null)
                throw new BadHttpRequestException("Missing Group.");

            if (lessonSchedule.SchedualedStartTime is null)
                throw new BadHttpRequestException("Missing Start Time.");

            if (lessonSchedule.SchedualedEndTime is null)
                throw new BadHttpRequestException("Missing End Time.");

            if (await clashDetectionService.LessonSceduleHasClash(lessonSchedule))
                throw new BadHttpRequestException("Schedule Clash Detected.");

        }
    }
}
