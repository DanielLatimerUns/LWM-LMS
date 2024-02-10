using LWM.Api.Dtos.ViewModels;
using LWM.Web.ViewModels;
using System.Linq.Expressions;

namespace LWM.Api.ApplicationServices.SchedualingServices.Contracts
{
    public interface ILessonScheduleQueries
    {
        LessonViewModel GetCurrentLessonForTeacher(UserViewModel userViewModel);

        LessonFeedViewModel GetCurrentLessonFeedForTeacher(UserViewModel userViewModel);

        IEnumerable<Dtos.DomainEntities.LessonSchedule> GetLessonSchedules(Expression<Func<Data.Models.LessonSchedule, bool>> filter = null);
    }
}