using LWM.Api.Dtos.Models;

namespace LWM.Api.DomainServices.Schedule.Contracts
{
    public interface IScheduleWriteService
    {
        Task<int> CreateAsync(ScheduleEntryModel scheduleEntry);
        Task DeleteAsync(int lessonScheduleId);
        Task UpdateAsync(ScheduleEntryModel scheduleEntry);
    }
}