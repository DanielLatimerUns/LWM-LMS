using LWM.Api.Dtos.DomainEntities;

namespace LWM.Api.DomainServices.LessonScheduleService.Contracts
{
    public interface ILessonScheduleWriteService
    {
        Task<int> CreateAsync(LessonSchedule lessonSchedule);
        Task DeleteAsync(int lessonScheduleId);
        Task UpdateAsync(LessonSchedule lessonSchedule);
    }
}