using System.Linq.Expressions;

namespace LWM.Api.ApplicationServices.Lesson.Contracts
{
    public interface ILessonQueries
    {
        Task<IEnumerable<Dtos.DomainEntities.Lesson>> GetLessonsAsync();

        Task<IEnumerable<Dtos.DomainEntities.Lesson>> GetLessonsBySearchStringAsync(string searchString);
    }
}