using LWM.Api.Dtos.DomainEntities;

namespace LWM.Api.DomainServices.LessonService.Contracts
{
    public interface ILessonWriteService
    {
        Task<int> CreateAsync(Lesson lesson);
        Task DeleteAsync(int lessonId);
        Task UpdateAsync(Lesson lesson);
    }
}