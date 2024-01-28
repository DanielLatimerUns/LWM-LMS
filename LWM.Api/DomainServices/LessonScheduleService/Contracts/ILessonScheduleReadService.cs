using System.Linq.Expressions;
using LWM.Api.Dtos.DomainEntities;

namespace LWM.Api.DomainServices.LessonScheduleService.Contracts
{
    public interface ILessonScheduleReadService
    {
        Task<IEnumerable<LessonSchedule>> GetLessonSchedules(Expression<Func<Data.Models.LessonSchedule, bool>> filter = null);
    }
}