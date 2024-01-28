namespace LWM.Api.ApplicationServices.SchedualingServices.Contracts
{
    public interface ILessonSchedualDeleteService
    {
        Task Execute(int lessonScheduleId);
    }
}