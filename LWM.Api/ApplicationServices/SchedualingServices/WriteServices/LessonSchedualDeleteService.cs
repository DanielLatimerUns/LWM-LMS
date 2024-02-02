using LWM.Api.ApplicationServices.SchedualingServices.Contracts;
using LWM.Api.DomainServices.LessonScheduleService.Contracts;
using LWM.Api.Dtos;

namespace LWM.Api.ApplicationServices.SchedualingServices.WriteServices
{
    public class LessonSchedualDeleteService(
        ILessonScheduleWriteService scheduleWriteService) : ILessonSchedualDeleteService
    {
        public async Task Execute(int lessonScheduleId)
        {
            await scheduleWriteService.DeleteAsync(lessonScheduleId);         
        }
    }
}
