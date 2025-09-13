using LWM.Api.DomainServices.Schedule.Contracts;
using LWM.Api.Dtos.Models;
using LWM.Api.Framework.Exceptions;

namespace LWM.Api.ApplicationServices.Scheduling.Services
{
    public interface IScheduleService
    {
        Task<int> Create(ScheduleEntryModel scheduleEntry);
        Task Delete(int lessonScheduleId);
        Task Update(ScheduleEntryModel scheduleEntry);
    }

    public class ScheduleService(IScheduleWriteService scheduleWriteService, 
        IClashDetectionService clashDetectionService) : IScheduleService
    {
        public async Task<int> Create(ScheduleEntryModel scheduleEntry)
        {
            Validate(scheduleEntry);

           return await scheduleWriteService.CreateAsync(scheduleEntry);
        }
        
        public async Task Delete(int lessonScheduleId)
        {
            await scheduleWriteService.DeleteAsync(lessonScheduleId);         
        }
        
        public async Task Update(ScheduleEntryModel scheduleEntry)
        {
            Validate(scheduleEntry);

            await scheduleWriteService.UpdateAsync(scheduleEntry);
        }

        private void Validate(ScheduleEntryModel scheduleEntry)
        {
            if (scheduleEntry is null)
                throw new BadRequestException("No Lesson Schedule Provided.");

            if (scheduleEntry.ScheduledDayOfWeek is null)
                throw new BadRequestException("Missing Day of week.");

            if (scheduleEntry.GroupId is null)
                throw new BadRequestException("Missing Group.");

            if (scheduleEntry.ScheduledStartTime is null)
                throw new BadRequestException("Missing Start Time.");

            if (scheduleEntry.ScheduledEndTime is null)
                throw new BadRequestException("Missing End Time.");

            // TODO: why am I not using the result
            var clash = clashDetectionService.FindClash(scheduleEntry);
        }
    }
}
