using LWM.Api.Dtos;

namespace LWM.Api.LessonService.Contracts
{
    public interface ILessonReadService
    {
        Task<IEnumerable<Lesson>> GetLessons();
    }
}