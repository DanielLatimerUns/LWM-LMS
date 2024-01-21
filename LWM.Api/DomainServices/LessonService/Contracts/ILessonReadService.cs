using LWM.Api.Dtos;

namespace LWM.Api.DomainServices.LessonService.Contracts
{
    public interface ILessonReadService
    {
        Task<IEnumerable<Lesson>> GetLessons();
    }
}