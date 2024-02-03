﻿using LWM.Api.ApplicationServices.PersonServices.Contracts;
using LWM.Api.ApplicationServices.SchedualingServices.Contracts;
using LWM.Api.DomainServices.LessonScheduleService.Contracts;
using LWM.Api.Dtos.DomainEntities;

namespace LWM.Api.ApplicationServices.SchedualingServices.WriteServices
{
    public class LessonSchedualUpdateService(
    ILessonScheduleWriteService scheduleWriteService,
    IClashDetectionService clashDetectionService) : ILessonSchedualUpdateService
    {
        public async Task Execute(LessonSchedule lessonSchedule)
        {
            await ValidateLessonSchedule(lessonSchedule);

            await scheduleWriteService.UpdateAsync(lessonSchedule);
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
                throw new BadHttpRequestException("Schedual Clash Detected.");
        }
    }
}