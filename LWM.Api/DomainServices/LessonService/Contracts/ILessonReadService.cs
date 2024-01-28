using LWM.Api.Dtos.DomainEntities;
using System.Linq.Expressions;

namespace LWM.Api.DomainServices.LessonService.Contracts
{
    public interface ILessonReadService
    {
        Task<IEnumerable<Lesson>> GetLessons(Expression<Func<LWM.Data.Models.Lesson, bool>> filter = null);
    }
}