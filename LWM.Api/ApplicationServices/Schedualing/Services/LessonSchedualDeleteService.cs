namespace LWM.Api.ApplicationServices.Schedualing.WriteServices
{
    using LWM.Api.ApplicationServices.Schedualing.Contracts;
    using LWM.Api.DomainServices.LessonScheduleService.Contracts;
    using LWM.Api.Dtos;

    public class LessonSchedualDeleteService(
        ILessonScheduleWriteService scheduleWriteService) : ILessonSchedualDeleteService
    {
        public async Task Execute(int lessonScheduleId)
        {
            await scheduleWriteService.DeleteAsync(lessonScheduleId);         
        }
    }
}
