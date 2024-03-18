namespace LWM.Api.ApplicationServices.Schedualing.WriteServices
{
    using LWM.Api.ApplicationServices.Schedualing.Contracts;
    using LWM.Api.DomainServices.LessonScheduleService.Contracts;
    using LWM.Api.Dtos.DomainEntities;
    using LWM.Api.Framework.Exceptions;


    public class LessonSchedualUpdateService(
    ILessonScheduleWriteService scheduleWriteService,
    IClashDetectionService clashDetectionService) : ILessonSchedualUpdateService
    {
        public async Task Execute(LessonSchedule lessonSchedule)
        {
            ValidateLessonSchedule(lessonSchedule);

            await scheduleWriteService.UpdateAsync(lessonSchedule);
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