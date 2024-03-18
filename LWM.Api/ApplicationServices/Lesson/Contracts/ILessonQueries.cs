using System.Linq.Expressions;

namespace LWM.Api.ApplicationServices.Lesson.Contracts
{
    public interface ILessonQueries
    {
        Task<IEnumerable<Dtos.DomainEntities.Lesson>> GetLessonsAsync(Expression<Func<Data.Models.Lesson, bool>> filter = null);
    }
}