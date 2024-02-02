using LWM.Api.Dtos.ViewModels;
using LWM.Web.ViewModels;

namespace LWM.Api.ApplicationServices.SchedualingServices.Contracts
{
    public interface ILessonScheduleQueries
    {
        LessonViewModel GetCurrentLessonForTeacher(UserViewModel userViewModel);

        LessonFeedViewModel GetCurrentLessonFeedForTeacher(UserViewModel userViewModel);
    }
}