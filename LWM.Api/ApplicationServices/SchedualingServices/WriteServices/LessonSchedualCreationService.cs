using LWM.Api.ApplicationServices.SchedualingServices.Contracts;
using LWM.Api.DomainServices.LessonScheduleService.Contracts;
using LWM.Api.Dtos.DomainEntities;
using LWM.Api.Framework.Exceptions;

namespace LWM.Api.ApplicationServices.SchedualingServices.WriteServices
{
    public class LessonSchedualCreationService(
    ILessonScheduleWriteService scheduleWriteService,
    IClashDetectionService clashDetectionService) : ILessonSchedualCreationService
    {
        public async Task<int> Execute(LessonSchedule lessonSchedule)
        {
            ValidateLessonSchedule(lessonSchedule);

            var result = await scheduleWriteService.CreateAsync(lessonSchedule);

            return result;
        }

        private void ValidateLessonSchedule(LessonSchedule lessonSchedule)
        {
            if (lessonSchedule is null)
                throw new BadRequestException("No Lesson Schedual Provided.");

            if (lessonSchedule.SchedualedDayOfWeek is null)
                throw new BadRequestException("Missing Day of week.");

            if (lessonSchedule.GroupId is null)
                throw new BadRequestException("Missing Group.");

            if (lessonSchedule.SchedualedStartTime is null)
                throw new BadRequestException("Missing Start Time.");

            if (lessonSchedule.SchedualedEndTime is null)
                throw new BadRequestException("Missing End Time.");

            var clash = clashDetectionService.FindClash(lessonSchedule);
        }
    }
}
