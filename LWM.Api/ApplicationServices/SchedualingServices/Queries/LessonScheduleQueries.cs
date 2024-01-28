using LWM.Api.DomainServices.LessonService.Contracts;
using LWM.Api.Dtos.DomainEntities;
using LWM.Api.Dtos.ViewModels;
using LWM.Data.Contexts;

namespace LWM.Api.ApplicationServices.SchedualingServices.Queries
{
    public class LessonScheduleQueries(
        CoreContext context)
    {
        public CurrentLessonViewModel GetCurrentLessonForTeacher(int teacherId)
        {
            var viewModel = new CurrentLessonViewModel
            {
                //TODO: finish this shit
            };

            return viewModel;
        }
    }
}
