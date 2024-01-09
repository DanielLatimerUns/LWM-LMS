using LWM.Api.Dtos;

namespace LWM.Api.LessonService.Contracts
{
    public interface ILessonWriteService
    {
        Task<int> CreateAsync(Lesson lesson);
        Task DeleteAsync(int lessonId);
        Task UpdateAsync(Lesson lesson);
    }
}